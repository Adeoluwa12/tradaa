"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRYPTO_STOCKS = exports.US_STOCKS = exports.NIGERIAN_STOCKS = void 0;
exports.NIGERIAN_STOCKS = [
    // Banks
    "ACCESS.NG", "FBNH.NG", "FCMB.NG", "FIDELITYBK.NG", "GTCO.NG",
    "JAIZBANK.NG", "STERLNBANK.NG", "UBA.NG", "UNIONBANK.NG", "WEMABANK.NG",
    "ZENITHBANK.NG",
    // Oil & Gas
    "ARDOVA.NG", "CONOIL.NG", "ETERNA.NG", "MOBIL.NG", "OANDO.NG",
    "SEPLAT.NG", "TOTAL.NG",
    // Consumer Goods
    "CADBURY.NG", "DANGSUGAR.NG", "FLOURMILL.NG", "GUINNESS.NG", "HONYFLOUR.NG",
    "NASCON.NG", "NESTLE.NG", "PZ.NG", "UNILEVER.NG",
    // Industrial Goods
    "BUACEMENT.NG", "CUTIX.NG", "DANGCEM.NG", "WAPCO.NG",
    // Healthcare
    "FIDSON.NG", "GLAXOSMITH.NG", "MAYBAKER.NG", "NEIMETH.NG",
    // Agriculture
    "OKOMUOIL.NG", "PRESCO.NG", "PRESTIGE.NG", "FTNCOCOA.NG",
    // Conglomerates
    "SCOA.NG", "TRANSCORP.NG", "UACN.NG",
    // ICT
    "CHAMS.NG", "CORNERST.NG", "ETRANZACT.NG", "NCR.NG",
    // Insurance
    "AIICO.NG", "CUSTODIAN.NG", "LASACO.NG", "LINKASSURE.NG", "MANSARD.NG",
    "NEM.NG", "REGALINS.NG", "ROYALEX.NG", "STACO.NG", "VERITASKAP.NG",
    // Others (Real Estate, Services, etc.)
    "ABCTRANS.NG", "ACADEMY.NG", "ARDOVA.NG", "CAVERTON.NG", "CHELLARAM.NG",
    "ELLAHLAKES.NG", "GOLDBREW.NG", "JBERGER.NG", "LEARNAFRCA.NG", "MCNICHOLS.NG",
    "MRS.NG", "RTBRISCOE.NG", "TANTALIZERS.NG", "TRIPPLEG.NG", "UPDC.NG",
    "VITAFOAM.NG",
    // New Additions (to reach 155)
    "AFRIPRUD.NG", "ASOSAVINGS.NG", "BETAGLAS.NG", "BUAFOODS.NG", "CHAMPION.NG",
    "COURTVILLE.NG", "DEAPCAP.NG", "EUNISELL.NG", "GOLDINSURE.NG", "GUINEAINS.NG",
    "IKEJAHOTEL.NG", "JOHNHOLT.NG", "JULI.NG", "LAWUNION.NG", "LIVESTOCK.NG",
    "MBENEFIT.NG", "MEDVIEWAIR.NG", "MEYER.NG", "MORISON.NG", "NAHCO.NG",
    "NASCO.NG", "NGXGROUP.NG", "NNFM.NG", "NOTORE.NG", "NPFMCRFBK.NG",
    "OASISINS.NG", "OMATEK.NG", "PHARMDEKO.NG", "PORTPAINT.NG", "PREMPAINTS.NG",
    "REDSTAREX.NG", "RESORTSAL.NG", "SKYAVN.NG", "SMURFIT.NG", "SOVERINS.NG",
    "THOMASWY.NG", "TIGERBRAND.NG", "TRANSEXPR.NG", "UCAP.NG", "UNHOMES.NG",
    "UNIONDICON.NG", "UNIVINSURE.NG", "VFDGROUP.NG", "WAPIC.NG"
];
exports.US_STOCKS = [
    // NYSE (New York Stock Exchange)
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "BRK.B", "JNJ", "V",
    "WMT", "PG", "MA", "UNH", "HD", "DIS", "BAC", "PYPL", "CMCSA", "ADBE",
    "NFLX", "PEP", "INTC", "CSCO", "CRM", "ABT", "TMO", "COST", "XOM", "CVX",
    "PFE", "MRK", "ABBV", "DHR", "LIN", "AVGO", "ACN", "ORCL", "QCOM", "TXN",
    "NKE", "MDT", "LOW", "UPS", "SBUX", "AMD", "INTU", "AMGN", "GS", "BLK",
    // NASDAQ
    "AAL", "ADP", "ALGN", "AMAT", "ASML", "ATVI", "BIDU", "BIIB", "BKNG", "CDNS",
    "CHTR", "CME", "COIN", "CSX", "CTAS", "CTSH", "DDOG", "DLTR", "EA", "EBAY",
    "EXC", "FAST", "FISV", "GILD", "GOOG", "HON", "IDXX", "ILMN", "INTC", "INTU",
    "ISRG", "JD", "KDP", "KHC", "KLAC", "LRCX", "LULU", "MAR", "MCHP", "MELI",
    "MNST", "MRNA", "MRVL", "MTCH", "MU", "NFLX", "NTES", "NXPI", "ODFL", "ON",
    // AMEX (Smaller cap stocks)
    "AAME", "ABEV", "ACU", "AE", "AEG", "AEMD", "AEY", "AEZS", "AFI", "AG",
    "AGEN", "AGX", "AHT", "AI", "AIM", "AINC", "AIRI", "AKO.A", "AKO.B", "AKR",
    "AKTS", "ALDX", "ALIM", "ALO", "ALOT", "ALTI", "AMBO", "AMPE", "AMS", "ANVS",
    "AOUT", "AP", "APDN", "APHB", "APT", "ARAV", "ARMP", "ARTL", "ARTNA", "ARTW",
    "ASM", "ASRT", "AT", "ATNM", "ATOS", "ATXG", "AUG", "AUMN", "AUS", "AVCT"
];
// Full US list (500+ stocks) available as a separate file or API call.
// Add this to stockList.ts
exports.CRYPTO_STOCKS = [
    // Major cryptocurrencies
    "BTC-USD", "ETH-USD", "BNB-USD", "XRP-USD", "ADA-USD",
    "SOL-USD", "DOGE-USD", "DOT-USD", "AVAX-USD", "MATIC-USD",
    // Additional cryptocurrencies
    "LINK-USD", "UNI-USD", "ATOM-USD", "LTC-USD", "ALGO-USD",
    "XLM-USD", "FIL-USD", "NEAR-USD", "ETC-USD", "HBAR-USD",
    // Stablecoins
    "USDT-USD", "USDC-USD", "DAI-USD", "BUSD-USD",
    // DeFi tokens
    "AAVE-USD", "MKR-USD", "CRV-USD", "COMP-USD", "YFI-USD",
    // NFT & Gaming tokens
    "AXS-USD", "MANA-USD", "SAND-USD", "ENJ-USD", "GALA-USD",
    // Layer 2 solutions
    "OP-USD", "ARB-USD", "IMX-USD", "LRC-USD", "ZKS-USD"
];
