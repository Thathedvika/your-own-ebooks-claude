# Denní journal A4 - 31 dní

Soubor k tisku: `denni-journal-31-dni-A4.pdf` (74 stran = 37 listů A4).

## Tisk

- Oboustranně, **převracet podél dlouhé strany** (long edge).
- Měřítko **100 % / skutečná velikost**, ne "přizpůsobit stránce".
- Okraj u hřbetu je 20 mm (hřebenová vazba), vnější okraj 12 mm. Na líci je hřbet vlevo, na rubu vpravo.

## Po svázání

| Dvojstrana | Vlevo | Vpravo |
|---|---|---|
| první strana | - | Měsíc (záměr, přehled trackeru, termíny) |
| den 1-31 | Ráno | Večer |
| po dnech 7, 14, 21, 28, 31 | Týdenní ohlédnutí (osobně, práce) | Studium, příští týden |
| poslední strana | Poznámky | - |

Všechny denní listy jsou stejné. Dvojstranu týdenní reflexe tvoří dva listy po sobě
(list "večer / ohlédnutí" a list "studium / ráno"). Tuto dvojici listů lze při vázání přesunout
na jiné místo, aby reflexe vycházela na konec skutečného týdne. Pořadí citátů se tím mírně změní.

## Úpravy

Obsah a počty linek: `build.js`. Vzhled: `journal.css`. Citáty: `quotes.json`, zdroje v `citaty-zdroje.md`.
Vygenerování: `NODE_PATH=/opt/node-tools/node_modules node journal/build.js` (Node + Playwright s Chromiem).

Fonty EB Garamond a Montserrat jsou pod licencí SIL Open Font License (viz `fonts/`).
