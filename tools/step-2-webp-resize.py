import argparse
from pathlib import Path

from PIL import Image


MAX_HEIGHT = 720


def resize_image(path: Path) -> None:
    """Resize a single PNG image in-place if its height exceeds MAX_HEIGHT,
    and also write a WEBP version at 90% quality."""
    try:
        with Image.open(path) as img:
            width, height = img.size
            original_size = (width, height)

            if height > MAX_HEIGHT:
                # Maintain aspect ratio
                scale = MAX_HEIGHT / float(height)
                new_width = int(width * scale)
                new_size = (new_width, MAX_HEIGHT)

                img = img.resize(new_size, Image.LANCZOS)
                width, height = img.size

                # Overwrite original PNG file with resized image
                img.save(path, format="PNG")
                print(f"Resized {path} from {original_size[0]}x{original_size[1]} to {width}x{height}")

            # Always (re)export WEBP at 90% quality based on the current img size
            webp_path = path.with_suffix(".webp")
            img.save(webp_path, format="WEBP", quality=90, method=6)
            print(f"Saved WEBP {webp_path} at {width}x{height} (quality=90)")
    except Exception as exc:
        print(f"Error processing {path}: {exc}")


def resize_directory(root: Path, recursive: bool = True) -> None:
    """Resize all PNG images under a directory."""
    if not root.exists():
        raise SystemExit(f"Path does not exist: {root}")

    if root.is_file():
        if root.suffix.lower() == ".png":
            resize_image(root)
        else:
            raise SystemExit("Provided file is not a PNG image.")
        return

    pattern = "**/*.png" if recursive else "*.png"
    count = 0

    for path in root.glob(pattern):
        if path.is_file():
            resize_image(path)
            count += 1

    print(f"Processed {count} PNG file(s) under {root}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Resize all PNG images in a directory so they are at most "
            f"{MAX_HEIGHT}px tall, overwriting the originals."
        )
    )
    parser.add_argument(
        "path",
        type=str,
        help="Directory or PNG file to process",
    )
    parser.add_argument(
        "--no-recursive",
        action="store_true",
        help="Only process PNG files directly in the given directory (no subdirectories).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    root = Path(args.path).expanduser().resolve()
    recursive = not args.no_recursive
    resize_directory(root, recursive=recursive)


if __name__ == "__main__":
    main()
