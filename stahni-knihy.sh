#!/usr/bin/env bash
# Stáhne všechny volně zpřístupněné knihy z knihovny psychoanalyza.cz
# do složky "Knihy - psychoanalýza".
#
# Použití:  bash stahni-knihy.sh
# Vyžaduje: curl, grep (běžně součást macOS i Linuxu)

set -uo pipefail

URL="https://www.psychoanalyza.cz/knihovna/"
CIL="Knihy - psychoanalýza"
UA="Mozilla/5.0 (compatible; osobni-zaloha/1.0)"

mkdir -p "$CIL"
echo "Načítám seznam z $URL ..."

HTML="$(curl -fsSL -A "$UA" "$URL")" || { echo "Nepodařilo se načíst stránku."; exit 1; }

# Vytáhne z HTML všechny odkazy na knižní soubory (pdf/epub/mobi/djvu)
ODKAZY="$(printf '%s' "$HTML" \
  | grep -Eoi 'href="[^"]+\.(pdf|epub|mobi|djvu)"' \
  | sed -E 's/^href="//; s/"$//' \
  | sort -u)"

if [ -z "$ODKAZY" ]; then
  echo "Na stránce nebyly nalezeny přímé odkazy na soubory."
  echo "Knihy jsou nejspíš za detailními stránkami jednotlivých titulů –"
  echo "otevři $URL a zkontroluj, jak jsou soubory linkované."
  exit 2
fi

POCET=0
while IFS= read -r odkaz; do
  [ -z "$odkaz" ] && continue
  # doplní doménu u relativních odkazů
  case "$odkaz" in
    http*) plna="$odkaz" ;;
    //*)   plna="https:$odkaz" ;;
    /*)    plna="https://www.psychoanalyza.cz$odkaz" ;;
    *)     plna="$URL$odkaz" ;;
  esac

  jmeno="$(basename "${plna%%\?*}")"
  jmeno="$(printf '%b' "${jmeno//%/\\x}")"   # dekóduje %20 apod.

  if [ -s "$CIL/$jmeno" ]; then
    echo "· už mám: $jmeno"
    continue
  fi

  echo "↓ stahuji: $jmeno"
  if curl -fL --retry 3 --retry-delay 2 -A "$UA" -o "$CIL/$jmeno" "$plna"; then
    POCET=$((POCET+1))
  else
    echo "  ! nepodařilo se: $plna"
    rm -f "$CIL/$jmeno"
  fi
  sleep 1   # ohleduplnost k serveru
done <<< "$ODKAZY"

echo
echo "Hotovo. Nově staženo: $POCET souborů."
echo "Složka: $(pwd)/$CIL"
ls -la "$CIL"
