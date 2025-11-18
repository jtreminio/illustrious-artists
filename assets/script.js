ARTIST_LIST = ["ebifurya", "hammer (sunset beach)", "haruyama kazunori", "itomugi-kun", "mizuki hitoshi", "kouji (campus life)", "kanon (kurogane knights)", "ruu (tksymkw)", "yaegashi nan", "naga u", "tani takeshi", "kou hiyoyo", "bkub", "tony taka", "matsunaga kouyou", "ojipon", "rebecca (keinelove)", "bow (bhp)", "a1 (initial-g)", "hara (harayutaka)", "Chihuri", "ido (teketeke)", "futa (nabezoko)", "bb (baalbuddy)", "hisahiko", "yohane", "hungry clicker", "dd (ijigendd)", "kirisawa juuzou", "hews", "hiroki (yyqw7151)", "zounose", "carnelian", "warugaki (sk-ii)", "shiseki hirame", "hamu koutarou", "m-da s-tarou", "kani biimu", "boris (noborhys)", "houtengeki", "rariatto (ganguri)", "minaba hideo", "kantoku", "abubu", "ishiyumi", "iesupa", "slugbox", "ichimi", "tsukishiro saika", "hisona (suaritesumi)", "nanashi (nlo)", "Nyantcha", "yua (checkmate)", "avogado6", "kouno (masao)", "sofra", "yukie (kusaka shi)", "drawfag", "tsukudani (coke-buta)", "kanikama", "koyama shigeru", "ueyama michirou", "milkpanda", "shino (ponjiyuusu)", "neocoill", "takafumi", "tsunako", "tsuda nanafushi", "taisa (kari)", "sincos", "agawa ryou", "izumi tsubasu", "sayori (neko works)", "konoshige (ryuun)", "wa (genryusui)", "gomashio (goma feet)", "hana kazari", "sumiyao (amam)", "toosaka asagi", "mattaku mousuke", "saiguchi otoufu", "null (nyanpyoun)", "kitsunerider", "yamamoto souichirou", "mochi au lait", "yuuji (and)", "enkyo yuuichirou", "beni shake", "anti (untea9)", "kotorai", "miyo (ranthath)", "mizuki makoto", "yuuhagi (amaretto-no-natsu)", "tomose shunsaku", "horosuke", "minami (colorful palette)", "haruhisky", "zen (kamuro)", "nekotoufu", "fujima takuya", "mizumizuni", "fumihiko (fu mihi ko)", "kashikaze", "yd (orange maru)", "ishikei", "ayu (mog)", "yuureidoushi (yuurei6214)", "takeuchi takashi", "clearite", "shiromanta", "echo (circa)", "creayus", "rappa (rappaya)", "gonzarez", "diva (hyxpk)", "imu sanjo", "shimazaki mujirushi", "mery (yangmalgage)", "merunyaa", "matsuryuu", "ichikawa feesu", "kasumi (skchkko)", "chanta (ayatakaoisii)", "ha akabouzu", "oouso", "tukiwani", "gweda", "kaamin (mariarose753)", "shirosato", "aaaa (quad-a)", "as109", "goma (gomasamune)", "hinghoi", "Ilya Kuvshinov", "Afrobull", "hizakatorotei", "dagasi", "Yoshio (55level)", "Eu03", "Spacezin", "Dikko", "Jack Dempa", "Horn/Wood", "Horn Wood", "Kloah", "Criis-Chan", "Koyorin", "Sakimichan", "Club3", "Aestheticc-Meme", "Magukappu", "rokugou daisuke", "Sciamano240", "No-kan", "Zankuro", "Haoni", "rororo", "Alp", "Mushi024", "Starraisins", "Juurouta", "Ge-b", "Ao Banana", "Nakamura Regura", "Takaharu", "Guweiz", "Shexyo", "Kisaragi Nana", "Free Style (yohan1754)", "Kyogoku Shin", "Stanley Lau", "Riz", "Anato Finnstark", "Oroborus", "Han (jackpot)", "Pottsness", "Kojima Takeshi", "Hu Dako", "Monori Rogue", "Zaphn", "Goshiki Suzu", "Hxd", "Harris Hero", "Dannex009", "Cafekun", "Randomboobguy", "Mochizuki Kei", "Prywinko", "Mirai Hikari", "Amano Don", "Kyuuba Melo", "Sei Shoujo", "Gogalking", "Oda Non", "Aroma Sensei", "Araneesama", "Wanaata", "Miyamoto Issa", "Nat The Lich", "Marumoru", "Aogisa", "Blue-Senpai", "Huanxiang Heitu", "Nikichen", "Magister", "Inkerton-Kun", "Cirenk", "Ratatatat74", "Inudori", "Caburi", "Lainart", "Magion02", "Love Cacao", "Chihunhentai", "Kuroi Suna", "Greenmarine", "Lynus", "Aoi Ogata", "Kurowa", "Ai-Wa", "Irohara Mitabi", "Sakura No Tomoru Hi E", "Nac000", "opossumachine", "Orushibu", "Noriuma", "Owler", "alkemanubis", "moriimee", "saonserey", "Otohime", "Yoshio", "Kase-Daiki", "Prison School Style", "Kamisimo90", "Takaman", "Nameo", "Free Style", "yohan1754", "Siu0207", "Han", "Jackpot", "Minakami", "flyingman555", "Kuya", "hey36253625", "Lazerflip", "Dino", "dinoartforame", "Seonoaiko", "Denwa0214", "Fei", "Khyle", "Bacun", "Luxu", "Rariatto", "Eigaka", "Devilhs", "Jujunaught", "Izayoi seishin", "Picturd", "Djcomps", "Popogori", "Dmitrys", "ningenmame", "ciloranko", "shosho lwlw", "tianliang duohe fangdongye", "cutesexyrobbuts", "jima", "oastlv", "z3zz4", "wamudraws", "healthyman"];
ARTIST_MAP = { "Horn/Wood": "HornWood" };

const galleryEl = document.getElementById("gallery");
const statusEl = document.getElementById("status");
const statusDotEl = document.getElementById("statusDot");
const statusTextEl = document.getElementById("statusText");
const errorEl = document.getElementById("error");
const toastEl = document.getElementById("toast");
const toastMainEl = document.getElementById("toastMain");
const toastSubEl = document.getElementById("toastSub");
const sizeButtons = document.querySelectorAll(".size-option");
const characterButtons = document.querySelectorAll(".character-option");
const SIZE_STORAGE_KEY = "gallerySizePreference";
const CHARACTER_STORAGE_KEY = "galleryCharacterPreference";

let toastTimeout;
let currentCharacter = "zelda";

function getStoredSize() {
    try {
        const stored = localStorage.getItem(SIZE_STORAGE_KEY);
        if (stored === "default" || stored === "large" || stored === "xlarge") {
            return stored;
        }
    } catch (_err) {
        // Ignore storage errors and fall through to default
    }
    return "default";
}

function storeSize(size) {
    try {
        localStorage.setItem(SIZE_STORAGE_KEY, size);
    } catch (_err) {
        // Ignore storage errors
    }
}

function getStoredCharacter() {
    try {
        const stored = localStorage.getItem(CHARACTER_STORAGE_KEY);
        if (typeof stored === "string" && stored.trim()) {
            return stored;
        }
    } catch (_err) {
        // Ignore storage errors
    }
    return "zelda";
}

function storeCharacter(slug) {
    try {
        localStorage.setItem(CHARACTER_STORAGE_KEY, slug);
    } catch (_err) {
        // Ignore storage errors
    }
}

function showToast(message, sub = "") {
    toastMainEl.textContent = message;
    toastSubEl.textContent = sub;
    toastEl.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toastEl.classList.remove("show");
    }, 1700);
}

function createCard(artistName) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `Copy "artist ${artistName}" to clipboard`);

    const thumbWrap = document.createElement("div");
    thumbWrap.className = "thumb-wrap";

    const img = document.createElement("img");
    const encodedName = encodeURIComponent(artistName);
    img.src = `images/${currentCharacter}/${encodedName}.webp`;
    img.alt = `Artwork by ${artistName}`;
    img.loading = "lazy";

    thumbWrap.appendChild(img);

    const label = document.createElement("div");
    label.className = "artist-name";

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "Artist";

    const nameSpan = document.createElement("span");
    nameSpan.className = "label";
    nameSpan.textContent = artistName;

    label.appendChild(badge);
    label.appendChild(nameSpan);

    item.appendChild(thumbWrap);
    item.appendChild(label);

    async function handleActivate() {
        const text = `artist ${artistName}`;
        try {
            await navigator.clipboard.writeText(text);
            item.classList.add("copied");
            setTimeout(() => item.classList.remove("copied"), 1300);
            showToast("Copied to clipboard", text);
        } catch (err) {
            console.error("Clipboard copy failed:", err);
            showToast("Could not copy", "Your browser blocked clipboard access");
        }
    }

    item.addEventListener("click", () => {
        handleActivate();
    });

    item.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
            evt.preventDefault();
            handleActivate();
        }
    });

    return item;
}

async function loadArtists() {
    galleryEl.innerHTML = "";

    ARTIST_LIST.forEach((name) => {
        if (typeof name !== "string" || !name.trim()) return;
        const baseName = name.trim();
        const mapped = Object.prototype.hasOwnProperty.call(ARTIST_MAP, baseName)
            ? ARTIST_MAP[baseName]
            : baseName;

        const effectiveName =
            typeof mapped === "string" && mapped.trim() ? mapped.trim() : baseName;

        const card = createCard(effectiveName);
        galleryEl.appendChild(card);
    });

    statusDotEl.classList.add("ready");
    const count = ARTIST_LIST.length;
    statusTextEl.textContent = `Loaded ${count} artist${count === 1 ? "" : "s"
        }. Click a card to copy.`;
}

function setSize(size) {
    document.body.classList.remove("size-large", "size-xlarge");

    sizeButtons.forEach((btn) => {
        const isActive = btn.dataset.size === size;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });

    if (size === "large") {
        document.body.classList.add("size-large");
    } else if (size === "xlarge") {
        document.body.classList.add("size-xlarge");
    }

    storeSize(size);
}

function setCharacter(slug) {
    currentCharacter = slug || "zelda";

    characterButtons.forEach((btn) => {
        const isActive = btn.dataset.character === currentCharacter;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });

    storeCharacter(currentCharacter);
    loadArtists();
}

characterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const slug = btn.dataset.character;
        if (!slug) return;
        setCharacter(slug);
    });
});

sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const size = btn.dataset.size || "default";
        setSize(size);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    setSize(getStoredSize());
    setCharacter(getStoredCharacter());
});