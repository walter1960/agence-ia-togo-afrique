import React, { useState } from 'react';
import { 
  Sprout, Landmark, CreditCard, MessageSquare, PhoneCall, Play, 
  MapPin, HelpCircle, FileText, CheckCircle2, DollarSign, ArrowRight,
  ShieldCheck, Loader2
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  client: string;
  item: string;
  amount: number;
  gateway: 'T-Money' | 'Flooz' | 'FedaPay';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'agro' | 'admin' | 'accounting' | 'fintech'>('agro');

  // Agro-Tech State
  const [selectedLang, setSelectedLang] = useState<'ewe' | 'kabye' | 'fr'>('ewe');
  const [agroQuery, setAgroQuery] = useState('Chenille legionnaire maïs');
  const [isAgroProcessing, setIsAgroProcessing] = useState(false);
  const [agroResult, setAgroResult] = useState<any>(null);

  // E-Gov State
  const [govQuery, setGovQuery] = useState('Nationalite');
  const [govResult, setGovResult] = useState<any>(null);

  // Accounting State
  const [ledgerInput, setLedgerInput] = useState('Vente de 3 paniers de tomates a Mme Adjoa pour 12000 F CFA paye via Flooz');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TX-9031", date: "2026-06-07 14:20", client: "Mme Kafui", item: "2 sacs de maïs", amount: 25000, gateway: "T-Money" },
    { id: "TX-9032", date: "2026-06-07 15:45", client: "M. Kodjo", item: "1 sac de manioc", amount: 8000, gateway: "Flooz" }
  ]);
  const [generatedReceipt, setGeneratedReceipt] = useState<any>(null);

  // Fintech State
  const [paymentGateway, setPaymentGateway] = useState<'tmoney' | 'flooz'>('tmoney');
  const [paymentAmount, setPaymentAmount] = useState(5000);
  const [phoneNumber, setPhoneNumber] = useState('+228 90 12 34 56');
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'pending' | 'success'>('idle');
  const [otpInput, setOtpInput] = useState('');

  // Local market prices database (mock)
  const marketPrices = [
    { item: "Maïs (sac 50kg)", price: "18 500 F CFA", trend: "stable", market: "Anié" },
    { item: "Manioc (sac 50kg)", price: "8 000 F CFA", trend: "up", market: "Kara" },
    { item: "Sorgho (sac 50kg)", price: "22 000 F CFA", trend: "down", market: "Lomé Grand Marché" }
  ];

  const handleAgroSearch = (queryType?: string) => {
    setIsAgroProcessing(true);
    setAgroResult(null);

    const query = queryType || agroQuery;

    setTimeout(() => {
      setIsAgroProcessing(false);
      if (query.toLowerCase().includes('maïs') || query.toLowerCase().includes('chenille')) {
        setAgroResult({
          transcription: "Comment puis-je proteger mes champs de maïs contre les chenilles a Anié ?",
          recommendation: "Il s'agit probablement de la Chenille Légionnaire d'Automne (Spodoptera frugiperda). 1. Inspectez vos jeunes maïs (2-4 semaines). 2. Appliquez une solution d'extrait de neem local ou du savon noir dilue si l'attaque est debutante. 3. Pour un traitement chimique homologue, contactez l'agent ICAT de votre localite (Anié).",
          audioUrl: "Simulated Audio Playback (Éwé/Kabyè translation)"
        });
      } else {
        setAgroResult({
          transcription: "Quels sont les engrais recommandes pour le coton ?",
          recommendation: "Pour le coton au Togo (recommandations NSCT) : utilisez le NPK 15-15-15 a raison de 150 kg/ha au 15e jour apres levée, suivi d'un apport d'uree a 50 kg/ha au 45e jour.",
          audioUrl: "Simulated Audio Playback"
        });
      }
    }, 1500);
  };

  const handleGovSearch = (type: string) => {
    setGovQuery(type);
    if (type === 'Nationalite') {
      setGovResult({
        title: "Obtention du Duplicata de Certificat de Nationalite Togolaise",
        institution: "Direction de la Sceau et de la Nationalite (Lomé / Delegations regionales)",
        fee: "5 000 F CFA",
        time: "7 a 15 jours ouvrables",
        docs: [
          "Original du Certificat de Nationalité (s'il est degrade)",
          "Copie legalisee de l'Acte de Naissance",
          "Photo d'identite du demandeur",
          "Timbres fiscaux de 1000 F CFA"
        ],
        steps: [
          "Constituer le dossier physique avec les pieces demandees.",
          "Se rendre au guichet de la Nationalite a Lomé ou au Tribunal de votre prefecture.",
          "Regler les frais de traitement (5000 F) et deposer le dossier.",
          "Retirer le duplicata muni du recu de depot apres le delai indique."
        ]
      });
    } else if (type === 'CFE') {
      setGovResult({
        title: "Creation d'Entreprise Individuelle au Togo (CFE)",
        institution: "Centre de Formalites des Entreprises (CFE Lomé)",
        fee: "26 200 F CFA (pour les nationaux)",
        time: "24 Heures (Delai officiel)",
        docs: [
          "Deux copies de la Carte Nationale d'Identite ou Passeport",
          "Declaration sur l'honneur signee au CFE",
          "Titre de propriete ou contrat de bail (si applicable)",
          "Photos d'identite"
        ],
        steps: [
          "Preparer les pieces d'identite requises.",
          "Se presenter dans les locaux du CFE (Lomé ou delegue prefectoral).",
          "Remplir le formulaire unique d'immatriculation.",
          "Proceder au paiement des frais au guichet unique et recuperer la carte de creation le lendemain."
        ]
      });
    }
  };

  const handleAccountingAdd = () => {
    // Parse text input for transaction (very simple mock parser)
    let client = "Client Standard";
    let amount = 5000;
    let item = "Produit divers";
    let gateway: 'T-Money' | 'Flooz' | 'FedaPay' = "FedaPay";

    if (ledgerInput.toLowerCase().includes('adjoa')) client = "Mme Adjoa";
    if (ledgerInput.toLowerCase().includes('tomates')) item = "3 paniers de tomates";
    if (ledgerInput.toLowerCase().includes('12000')) amount = 12000;
    if (ledgerInput.toLowerCase().includes('flooz')) gateway = "Flooz";
    if (ledgerInput.toLowerCase().includes('tmoney')) gateway = "T-Money";

    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().substring(0, 16).replace('T', ' '),
      client,
      item,
      amount,
      gateway
    };

    setTransactions(prev => [newTx, ...prev]);
    setGeneratedReceipt(newTx);
  };

  const triggerCheckout = () => {
    setCheckoutStatus('pending');
    setTimeout(() => {
      // Prompt for OTP
      setCheckoutStatus('pending');
    }, 1000);
  };

  const confirmOTP = () => {
    setCheckoutStatus('success');
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().substring(0, 16).replace('T', ' '),
      client: `Client (${phoneNumber})`,
      item: "Abonnement Agence IA",
      amount: paymentAmount,
      gateway: paymentGateway === 'tmoney' ? 'T-Money' : 'Flooz'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col p-4 md:p-8 space-y-6">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-emerald-500/20 space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🇹🇬</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-yellow-200 to-red-400 bg-clip-text text-transparent title-font">
                Agence IA Togo & Afrique
              </h1>
              <p className="text-slate-400 text-sm mt-0.5 font-medium">
                Solutions d'intelligence artificielle souveraines adaptees aux economies locales
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 self-start md:self-auto">
          <div className="text-right">
            <span className="text-xs text-slate-400">Devise de reference</span>
            <p className="text-sm font-bold text-emerald-400 font-mono">Franc CFA (XOF)</p>
          </div>
        </div>
      </header>

      {/* Tabs Menu */}
      <div className="flex overflow-x-auto border-b border-slate-800 space-x-2 pb-1">
        <button
          onClick={() => setActiveTab('agro')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'agro' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Sprout className="h-4.5 w-4.5" /> Agro-Tech & Marchés
        </button>
        <button
          onClick={() => { setActiveTab('admin'); handleGovSearch('Nationalite'); }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'admin' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Landmark className="h-4.5 w-4.5" /> Assistance Administration
        </button>
        <button
          onClick={() => setActiveTab('accounting')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'accounting' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="h-4.5 w-4.5" /> Comptable IA PME
        </button>
        <button
          onClick={() => setActiveTab('fintech')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'fintech' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="h-4.5 w-4.5" /> Fintech local (Sandbox)
        </button>
      </div>

      {/* Main Content Grid */}
      <main className="flex-1">
        
        {/* Tab: Agro-Tech */}
        {activeTab === 'agro' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Search agricultural advisor */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              <div className="togo-card togo-card-accent p-6 rounded-2xl space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-emerald-500" /> Conseiller Agricole Vocal (Simulateur)
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">Langue de l'agriculteur</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedLang('ewe')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          selectedLang === 'ewe' ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        Éwé (Audio)
                      </button>
                      <button 
                        onClick={() => setSelectedLang('kabye')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          selectedLang === 'kabye' ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        Kabyè (Audio)
                      </button>
                      <button 
                        onClick={() => setSelectedLang('fr')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          selectedLang === 'fr' ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        Français (Texte)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">Question agricole / Culture cible</label>
                    <input 
                      value={agroQuery}
                      onChange={(e) => setAgroQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAgroSearch("Chenille maïs")}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-semibold text-slate-400"
                      >
                        Maïs & Chenilles
                      </button>
                      <button 
                        onClick={() => handleAgroSearch("NPK coton")}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-semibold text-slate-400"
                      >
                        Engrais Coton
                      </button>
                    </div>

                    <button
                      onClick={() => handleAgroSearch()}
                      disabled={isAgroProcessing}
                      className="px-4 py-2 rounded-lg btn-togo text-xs font-bold flex items-center gap-1.5"
                    >
                      {isAgroProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} Obtenir conseils
                    </button>
                  </div>
                </div>
              </div>

              {/* Response Panel */}
              {agroResult && (
                <div className="togo-card p-6 rounded-2xl space-y-4 fade-in">
                  <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-400">Reponse de l'assistant Hermes</h3>
                    <span className="text-[10px] text-slate-500">Audio traduit et synthetise</span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Transcription Audio</span>
                    <p className="text-xs text-slate-300 italic mt-0.5">"{agroResult.transcription}"</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Conseils RAG Agricoles</span>
                    <p className="text-xs text-slate-200 leading-6 mt-1">{agroResult.recommendation}</p>
                  </div>

                  {/* Simulated player */}
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">{agroResult.audioUrl}</span>
                    <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold">
                      ECOUTER L'AUDIO (EWE)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Local market prices */}
            <div className="lg:col-span-4 togo-card togo-card-warning p-6 rounded-2xl space-y-4 self-start">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-500" /> Cours du Marche (Togo Agricole)
              </h2>
              
              <div className="space-y-3">
                {marketPrices.map((p, i) => (
                  <div key={i} className="p-3.5 bg-slate-900/50 border border-slate-850 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{p.item}</h4>
                      <span className="text-[10px] text-slate-500">Marche de {p.market}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-amber-500 font-mono">{p.price}</span>
                      <p className={`text-[9px] ${p.trend === 'up' ? 'text-emerald-400' : p.trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
                        {p.trend === 'up' ? '▲ en hausse' : p.trend === 'down' ? '▼ en baisse' : '● stable'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab: E-Gouvernance */}
        {activeTab === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Administrative selection */}
            <div className="lg:col-span-4 togo-card togo-card-accent p-6 rounded-2xl space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Landmark className="h-5 w-5 text-emerald-500" /> Demarche Administrative
              </h2>

              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleGovSearch('Nationalite')}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    govQuery === 'Nationalite' ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <h4 className="text-xs font-bold">Nationalite Togolaise</h4>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Frais, delais et documents requis</span>
                </button>

                <button
                  onClick={() => handleGovSearch('CFE')}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    govQuery === 'CFE' ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <h4 className="text-xs font-bold">Creation de PME (CFE)</h4>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Enregistrer son entreprise au Togo</span>
                </button>
              </div>
            </div>

            {/* Right: Step-by-step guidance */}
            {govResult && (
              <div className="lg:col-span-8 togo-card p-6 rounded-xl space-y-6 fade-in">
                <div>
                  <h3 className="text-lg font-bold text-emerald-400">{govResult.title}</h3>
                  <span className="text-xs text-slate-400 mt-1 block">Organisme : {govResult.institution}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-slate-800 py-4 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Frais d'Etablissement</span>
                    <p className="text-sm font-bold text-amber-500 mt-0.5">{govResult.fee}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Delai Moyen</span>
                    <p className="text-sm font-bold text-cyan-400 mt-0.5">{govResult.time}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-200">Documents a Fournir :</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {govResult.docs.map((d: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-200">Etapes de la Procedure :</h4>
                  <div className="space-y-2.5">
                    {govResult.steps.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <span className="h-5 w-5 bg-slate-800 border border-slate-700 text-emerald-400 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-300 leading-5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Tab: Comptable IA */}
        {activeTab === 'accounting' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Input details */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="togo-card togo-card-accent p-6 rounded-2xl space-y-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-emerald-500" /> Saisie de Vente Directe
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">Message Whatsapp du commercant</label>
                    <textarea
                      value={ledgerInput}
                      onChange={(e) => setLedgerInput(e.target.value)}
                      rows={3}
                      className="w-full text-xs bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-white focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleAccountingAdd}
                    className="w-full py-2 rounded-lg btn-togo text-xs font-bold"
                  >
                    Generer Recu & Comptabiliser
                  </button>
                </div>
              </div>

              {/* Transactions Ledger table */}
              <div className="togo-card p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-slate-200">Journal Comptable (Grand Livre)</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500">
                        <th className="py-2">Date</th>
                        <th>Client</th>
                        <th>Montant</th>
                        <th>Gateway</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(tx => (
                        <tr key={tx.id} className="border-b border-slate-850 hover:bg-slate-900/20">
                          <td className="py-2.5 font-mono text-[10px] text-slate-400">{tx.date}</td>
                          <td className="font-semibold">{tx.client}</td>
                          <td className="font-mono text-emerald-400 font-bold">{tx.amount} F CFA</td>
                          <td>
                            <span className="text-[10px] px-2 py-0.5 bg-slate-800 rounded-full border border-slate-700">
                              {tx.gateway}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Receipt generator */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {generatedReceipt ? (
                <div className="receipt-paper p-6 rounded-xl border border-slate-300 space-y-4 fade-in">
                  <div className="text-center pb-4 border-b border-dashed border-slate-400 font-bold">
                    <h3 className="text-base tracking-wider uppercase">LOMÉ COMERCE S.A.R.L</h3>
                    <p className="text-[10px] font-normal mt-1">Lomé, Grand Marché - TOGO</p>
                    <p className="text-[10px] font-normal">Tel: +228 90 00 00 00</p>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span>REF:</span>
                      <span className="font-bold">{generatedReceipt.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DATE:</span>
                      <span>{generatedReceipt.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLIENT:</span>
                      <span className="font-bold">{generatedReceipt.client}</span>
                    </div>
                  </div>

                  <div className="border-t border-b border-dashed border-slate-400 py-3 text-xs space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span>DESIGNATION</span>
                      <span>TOTAL</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{generatedReceipt.item}</span>
                      <span>{generatedReceipt.amount} F</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-sm">
                    <span>NET A PAYER:</span>
                    <span>{generatedReceipt.amount} F CFA</span>
                  </div>

                  <div className="text-center pt-4 border-t border-dashed border-slate-400 text-[9px]">
                    <p>Payé via {generatedReceipt.gateway}</p>
                    <p className="mt-1">Facture générée automatiquement par Agence IA.</p>
                  </div>
                </div>
              ) : (
                <div className="togo-card p-6 rounded-xl flex items-center justify-center text-slate-500 h-64 border border-dashed border-slate-800">
                  <p className="text-xs">Saisissez une vente et cliquez sur le bouton pour generer le recu client.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab: Fintech sandbox */}
        {activeTab === 'fintech' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: configuration */}
            <div className="lg:col-span-5 togo-card togo-card-accent p-6 rounded-2xl space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-500" /> Lien de Paiement Mobile Money
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5 font-medium">Operateur Mobile Money</label>
                  <div className="grid grid-cols-2 gap-2 font-semibold">
                    <button
                      onClick={() => setPaymentGateway('tmoney')}
                      className={`p-3 rounded-lg border text-left ${
                        paymentGateway === 'tmoney' ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      T-Money (Togo)
                    </button>
                    <button
                      onClick={() => setPaymentGateway('flooz')}
                      className={`p-3 rounded-lg border text-left ${
                        paymentGateway === 'flooz' ? 'bg-amber-950/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      Flooz (Moov)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1.5 font-medium">Montant (F CFA)</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1.5 font-medium">Numero Mobile Money</label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-200 focus:outline-none"
                  />
                </div>

                <button
                  onClick={triggerCheckout}
                  className="w-full py-2.5 rounded-lg btn-togo text-xs font-bold uppercase tracking-wider"
                >
                  Declencher Paiement USSD
                </button>
              </div>
            </div>

            {/* Right: Checkout sandbox */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {checkoutStatus === 'pending' && (
                <div className="togo-card p-6 rounded-xl space-y-6 fade-in max-w-sm mx-auto">
                  <div className="text-center space-y-2">
                    <ShieldCheck className="h-10 w-10 text-emerald-500 mx-auto" />
                    <h3 className="text-sm font-bold">FedaPay Mobile Checkout</h3>
                    <p className="text-[10px] text-slate-400">Demande envoyee au numero {phoneNumber}</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl space-y-3 border border-slate-850">
                    <p className="text-xs text-slate-300 leading-5">
                      Veuillez taper votre code secret sur votre telephone apres le prompt USSD de confirmation de debit de <strong>{paymentAmount} F CFA</strong>.
                    </p>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Code OTP de validation</label>
                      <input
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="Ex: 8391"
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-xs text-slate-200 text-center font-bold tracking-widest focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setCheckoutStatus('idle')}
                      className="w-1/2 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={confirmOTP}
                      className="w-1/2 py-2 rounded btn-togo text-xs font-bold"
                    >
                      Confirmer Debit
                    </button>
                  </div>
                </div>
              )}

              {checkoutStatus === 'success' && (
                <div className="togo-card p-6 rounded-xl space-y-4 text-center max-w-sm mx-auto fade-in">
                  <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold">Debit Reussi !</h3>
                    <p className="text-[10px] text-slate-400">Paiement traite avec succes par FedaPay.</p>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-850 rounded text-xs font-mono text-emerald-400">
                    STATUS: SUCCESS<br />
                    AMOUNT: {paymentAmount} F CFA<br />
                    GATEWAY: {paymentGateway.toUpperCase()}<br />
                    REF: FEDA-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <button
                    onClick={() => { setCheckoutStatus('idle'); setOtpInput(''); }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-xs font-bold"
                  >
                    Faire une autre transaction
                  </button>
                </div>
              )}

              {checkoutStatus === 'idle' && (
                <div className="togo-card p-6 rounded-xl flex items-center justify-center text-slate-500 h-64 border border-dashed border-slate-800">
                  <p className="text-xs">Configurez les parametres a gauche et declenchez le paiement pour tester la sandbox local Mobile Money.</p>
                </div>
              )}

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
