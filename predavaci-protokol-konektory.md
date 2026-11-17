# Předávací protokol - napojení výzkumných zdrojů na Claude

Datum: 2026-11-17
Účel: dokončit napojení zdrojů pro medical research. Nová session běží na počítači uživatelky (Claude Desktop / Claude in Chrome), aby šlo pracovat v jejím přihlášeném Chrome.

## Hotovo (ověřeno)

- Hugging Face konektor: připojen, účet `thehedvika`, testovací vyhledání EEG datasetů vrátilo výsledky.
- Již připojené výzkumné konektory: PubMed, Consensus, Scite, OpenAlex, Clinical Trials, Elicit, Google Scholar (HasData), Open Targets, smarts.bio.

## Zbývá udělat

### 1. Kaggle - vlastní konektor
- Nejprve zkusit najít v Customize > Connectors > Browse (předchozí hledání pokrylo jen část adresáře).
- Pokud není: Customize > Connectors > Add > Add custom connector
  - Název: Kaggle
  - URL: `https://www.kaggle.com/mcp`
  - Ověření: ponechat "Detected", přihlášení Kaggle účtem (OAuth) - potvrzuje uživatelka.
- Stav ověření: URL pochází z katalogů třetích stran, oficiální dokumentace Kaggle nešla v cloudové session načíst (síť blokovala kaggle.com). Před přidáním ověřit na kaggle.com.

### 2. OpenNeuro - vlastní konektor
- Název: OpenNeuro
- URL: `https://open-neuro-mcp-server.quentincody.workers.dev/sse`
- Ověření: žádné (No sign-in).
- Stav ověření: komunitní server (Quentin Cody), není oficiální OpenNeuro. GitHub repozitář vracel 404. Pokud připojení selže, server pravděpodobně neběží.

### 3. Omezení plánu
- Free plán: jen 1 vlastní konektor. Pak vybrat podle tématu (neurověda = OpenNeuro, obecná data = Kaggle).

### 4. Test po připojení
- "Najdi na OpenNeuro EEG datasety ke spánku"
- "Najdi na Kaggle datasety k diabetické retinopatii"

### 5. Volitelně cerebrarium.com
- Prohlédnout web (z cloudové session nedostupný) a zjistit, zda nabízí API nebo stažení dat. Podle dostupných informací jde jen o 3D prohlížeč (730 struktur, 7T MRI, 0,25 mm).

## Odloženo (až při analýze dat, jen Claude Desktop / Claude Code lokálně)

- Galaxy: oficiální lokální MCP `galaxy-mcp` (pip), potřebuje GALAXY_URL a GALAXY_API_KEY (např. usegalaxy.eu).
- Google Colab: `github.com/googlecolab/colab-mcp`, jen lokální klient, přes uvx.
- Brian2, NEURON: Python knihovny, konektor nepotřebují.

## Vyřazeno (nejsou zdroje dat)

Forage, LabXchange, SPAR, Google Summer of Code, RISE @ IIT Kanpur. EURAXESS nemá oficiální API ani RSS - případně řešit naplánovanou úlohou s webovým vyhledáváním.

## Pravidla pro novou session

- Hesla a OAuth potvrzení zadává vždy uživatelka sama.
- Odkazy uvádět jako plné URL na samostatném řádku, bez em dash.

## Zdroje

Postup přidání vlastního konektoru (Anthropic):
https://claude.com/docs/connectors/custom/remote-mcp

OpenNeuro MCP (katalog):
https://lobehub.com/mcp/quentincody-open-neuro-mcp-server

Kaggle MCP, srovnání oficiálního a komunitního serveru:
https://github.com/Galaxy-Dawn/kaggle-mcp

Galaxy MCP:
https://pypi.org/project/galaxy-mcp

Colab MCP:
https://github.com/googlecolab/colab-mcp

Cerebrarium:
https://cerebrarium.com/
