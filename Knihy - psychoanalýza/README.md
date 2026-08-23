# Knihy - psychoanalýza

Cílová složka pro knihy z knihovny České psychoanalytické společnosti
(https://www.psychoanalyza.cz/knihovna/).

Složka je zatím prázdná: doména `www.psychoanalyza.cz` je blokovaná
egress politikou tohoto vzdáleného prostředí (proxy vrací 403 na CONNECT),
takže z tohoto sezení soubory stáhnout nelze.

Naplnit ji lze skriptem `../stahni-knihy.sh` spuštěným lokálně:

    bash stahni-knihy.sh

Skript projde stránku knihovny, najde odkazy na soubory (.pdf/.epub/.mobi/.djvu)
a uloží je sem. Stahuj prosím jen tituly, které společnost zpřístupňuje volně,
a respektuj podmínky uvedené na jejich webu.
