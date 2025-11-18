import argparse
import os
import re
import sys
import uuid
from collections import defaultdict
from pathlib import Path

# Regex to remove a numeric artist prefix at the beginning of the filename stem,
# e.g. "2132001-artist " or "2215001-artist ".
PREFIX_REGEX = re.compile(r"^\d+-artist\s+")


def transform_filename(filename: str, truncate_after: str | None = None) -> str:
    """
    Transform a single filename according to the rules:

    - Remove a leading prefix matching the regex ``^\d+-artist\s+`` from the
      stem (if present).
    - Optionally remove a user-provided substring (case-insensitive, literal
      match) and everything after it in the stem.
    - Always keep the original file extension.
    """
    stem, ext = os.path.splitext(filename)

    # If there's no extension, leave the filename unchanged.
    if not ext:
        return filename

    # Remove the regex-matched prefix at the beginning of the stem.
    stem = PREFIX_REGEX.sub("", stem)

    # Truncate at the first occurrence of the user-provided substring
    # (case-insensitive, literal match), removing it and everything after it.
    if truncate_after:
        lower_stem = stem.lower()
        lower_truncate = truncate_after.lower()
        idx = lower_stem.find(lower_truncate)
        if idx != -1:
            stem = stem[:idx]

    new_name = stem.strip() + ext
    return new_name


def plan_renames(directory: Path, truncate_after: str | None = None):
    """
    Build a mapping of files to their new names and detect duplicate targets.
    Returns:
        mapping: dict[Path, Path] of src -> dst
        duplicates: dict[str, list[Path]] of target_name -> list[src_paths]
    """
    mapping: dict[Path, Path] = {}
    targets = defaultdict(list)

    for entry in directory.iterdir():
        if not entry.is_file():
            continue

        new_name = transform_filename(entry.name, truncate_after=truncate_after)
        dst = directory / new_name
        mapping[entry] = dst
        targets[dst.name].append(entry)

    duplicates = {name: srcs for name, srcs in targets.items() if len(srcs) > 1}
    return mapping, duplicates


def apply_renames(mapping: dict[Path, Path]) -> None:
    """
    Safely apply renames using a two-step temporary rename to avoid collisions.
    """
    # First, rename all sources to temporary unique names.
    tmp_mapping: dict[Path, Path] = {}
    for src in mapping.keys():
        tmp_name = f"__tmp_rename_{uuid.uuid4().hex}__{src.suffix}"
        tmp_path = src.with_name(tmp_name)
        os.rename(src, tmp_path)
        tmp_mapping[tmp_path] = mapping[src]

    # Then, rename from temporary names to final targets.
    for tmp_src, final_dst in tmp_mapping.items():
        os.rename(tmp_src, final_dst)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Rename files in a directory by removing a numeric artist prefix "
            'matching the regex "^\\d+-artist\\s+" and optionally truncating '
            "after a user-provided substring, while keeping the original file "
            "extension. Files that would result in duplicate target names are "
            "skipped, and a warning is printed."
        )
    )
    parser.add_argument(
        "directory",
        nargs="?",
        default="images/zelda",
        help="Directory to process (default: images/zelda)",
    )
    parser.add_argument(
        "--truncate-after",
        "-t",
        dest="truncate_after",
        help=(
            "Substring at which to truncate filenames (case-insensitive, "
            "literal match). If omitted, filenames are not truncated."
        ),
    )

    args = parser.parse_args(argv)
    directory = Path(args.directory).expanduser().resolve()

    if not directory.is_dir():
        print(
            f"Error: {directory} is not a directory or does not exist.", file=sys.stderr
        )
        return 1

    mapping, duplicates = plan_renames(directory, truncate_after=args.truncate_after)

    if not mapping:
        print(f"No files found in {directory}")
        return 0

    # Build a set of all sources that would produce duplicate target names.
    colliding_sources: set[Path] = set()
    for sources in duplicates.values():
        colliding_sources.update(sources)

    # Only rename files whose target names are unique.
    safe_mapping = {
        src: dst for src, dst in mapping.items() if src not in colliding_sources
    }

    if not safe_mapping:
        print(
            "WARNING: All planned renames would result in duplicate target filenames. "
            "No files were renamed.\n"
        )
        for target, sources in duplicates.items():
            print(f"Target name '{target}' would be produced by:")
            for src in sources:
                print(f"  - {src.name}")
        return 1

    print(f"Planned renames in {directory}:")
    for src, dst in mapping.items():
        if src in colliding_sources:
            print(f"  {src.name} -> {dst.name} (SKIPPED, duplicate target)")
        elif src.name != dst.name:
            print(f"  {src.name} -> {dst.name}")
        else:
            print(f"  {src.name} (unchanged)")

    apply_renames(safe_mapping)

    print(
        f"\nRenaming complete. Renamed {len(safe_mapping)} file(s); "
        f"skipped {len(colliding_sources)} file(s) due to duplicate target names."
    )

    if duplicates:
        print("\nWARNING: Some files were skipped due to duplicate target filenames:")
        for target, sources in duplicates.items():
            print(f"  Target name '{target}' would be produced by:")
            for src in sources:
                print(f"    - {src.name}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
