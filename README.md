from pathlib import Path

readme_content = """
# 🕹️ Nu, pogodi! – moderní webová verze retro hry

Tento projekt je **volnou webovou adaptací klasické sovětské hry „Ну, погоди!“**. Nejde o přesnou kopii, ale o moderní verzi vytvořenou pomocí HTML, CSS a čistého JavaScriptu. Cílem bylo zachovat ducha původní hry a zároveň využít prvky jako **vlastní font, retro design a plynulé animace**, které navozují nostalgickou atmosféru.

---

## 🎯 O projektu

- Volná rekonstrukce legendární elektronické hry z 80. let
- Ovládání vlka a chytání vajíček v retro stylu
- Hratelné jak na klávesnici, tak na mobilních zařízeních
- Stylizované písmo, zvuky a barevné schéma pro retro dojem

---

## ✨ Co hra nabízí

- Generování vajíček na čtyřech pozicích s náhodným výskytem
- Ovládání vlka pomocí kláves (`W`, `A`, `S`, `D`) nebo mobilních tlačítek
- Systém skóre a tří chyb (po třetí chybě hra končí)
- Zobrazení „Game Over“ a možnost restartu
- Zvukové efekty a vizuální přechody
- Přepínání mezi denním a nočním režimem
- Responzivní rozvržení optimalizované pro mobilní hraní

---

## 🧰 Použité technologie

- **HTML5**
- **CSS3** – vlastní proměnné, animace, media queries
- **Vanilla JavaScript** – časovače, eventy, správa hry
- **.mp3 zvuky** – reakce na chyby, úspěšné chycení vajíčka apod.
- **Obrázky** – uložené ve složce `/img`

---

## 📸 Náhled

![image](https://github.com/user-attachments/assets/474aede7-c02c-481f-bc45-c2b87ca24121)


---

## 🧪 Co jsem se naučila

- Jak navrhnout funkční hru pomocí čistého JavaScriptu bez frameworků
- Práci s časovači, událostmi a dynamickým DOM
- Optimalizaci ovládání pro různá zařízení (klávesnice / dotyk)
- Jak sladit vizuální styl a UX tak, aby působil jako retro herní zážitek

---

## 📍 Pozadí projektu

Tento projekt vznikl spontánně – když jsem doma objevila starou nefunkční herní konzoli, rozhodla jsem se hře dát **nový digitální život**. Byl to zábavný osobní projekt, který mi zároveň umožnil procvičit JS a vylepšit schopnosti v oblasti interaktivních webů.

---

## 🔗 Odkazy

- 🔗 [Živá ukázka hry](https://alena-pumprova.cz/projects/nu-pogodi/)  
- 🗂️ [Zdrojový kód na GitHubu](https://github.com/Alena0490/Nu-pogodi)

---

Chceš-li si zahrát nebo se podívat do kódu, klidně si projekt otevři nebo forkni. A pokud tě baví podobné retro nápady, budu ráda za zpětnou vazbu nebo spolupráci. 🎮
"""

readme_path = Path("/mnt/data/README_NuPogodi.md")
readme_path.write_text(readme_content.strip(), encoding="utf-8")
readme_path
