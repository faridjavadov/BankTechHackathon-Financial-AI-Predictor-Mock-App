import { NewsArticle } from '../types';
export const newsArticles: NewsArticle[] = [
  {
    id: 'news-001',
    title: "Fed Signals Potential Rate Cuts in Next Quarter",
    summary: "Federal Reserve officials indicated they may begin reducing interest rates in the coming months, citing improving inflation data and concerns about labor market cooling.",
    content: "The Federal Reserve on Wednesday signaled it could begin cutting interest rates as soon as September, with several officials noting that inflation has made substantial progress toward the central bank's 2% target.\n\nIn a statement following their two-day policy meeting, Fed officials kept their benchmark interest rate unchanged in a range of 5.25% to 5.5%, but noted they now have \"greater confidence\" that inflation is moving sustainably toward their target.\n\nFed Chair Jerome Powell said in a press conference that the central bank would need to see continued positive inflation data before making any cuts, but acknowledged the substantial progress already made.\n\n\"We're in a position now where we can approach that decision carefully,\" Powell said. \"We want to be more confident that inflation is moving sustainably down to 2% before we ease policy.\"",
    source: {
      id: 'src-001',
      name: 'Bloomberg',
      reliability: 92,
      logoUrl: 'https://companieslogo.com/img/orig/BBAX-3c68febd.png?t=1633439869',
      category: 'Financial News'
    },
    publishedAt: '2023-06-15T18:30:00Z',
    url: 'https://bloomberg.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
    category: 'Monetary Policy',
    topics: ['Federal Reserve', 'Interest Rates', 'Inflation', 'US Economy'],
    sentiment: 'positive',
    impactLevel: 'high',
    relatedAssets: ['USD/EUR', 'USD/TRY', 'Treasury Bonds']
  },
  {
    id: 'news-002',
    title: "OPEC+ Agrees to Extend Production Cuts",
    summary: "OPEC and its allies agreed to extend oil production cuts through the end of the year, potentially supporting higher crude prices amid uncertain global demand.",
    content: "The Organization of the Petroleum Exporting Countries and its allies, including Russia, collectively known as OPEC+, have agreed to extend their voluntary oil production cuts of 5.86 million barrels per day through December 2023.\n\nThe decision, announced after a virtual meeting on Sunday, aims to stabilize oil markets as concerns about global economic growth and energy demand persist. The group cited \"ongoing market uncertainties related to global economic growth and energy demand\" as justification for the extended cuts.\n\nSaudi Arabia, the group's de facto leader, will continue its additional voluntary cut of 1 million barrels per day, which it implemented in July, for the remainder of the year.\n\n\"This is a proactive approach to market stability,\" said Saudi Energy Minister Prince Abdulaziz bin Salman. \"We will continue to monitor market conditions and are prepared to make further adjustments if necessary.\"",
    source: {
      id: 'src-002',
      name: 'Reuters',
      reliability: 94,
      logoUrl: 'https://companieslogo.com/img/orig/TRI-3af08c13.png?t=1652775420',
      category: 'Financial News'
    },
    publishedAt: '2023-06-12T14:15:00Z',
    url: 'https://reuters.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1545244435-f2c9e0df6cf9',
    category: 'Commodities',
    topics: ['OPEC', 'Oil Production', 'Energy Markets', 'Saudi Arabia'],
    sentiment: 'positive',
    impactLevel: 'high',
    relatedAssets: ['Crude Oil', 'Brent', 'Energy Stocks']
  },
  {
    id: 'news-003',
    title: "Türkiye Central Bank Raises Interest Rates to Combat Inflation",
    summary: "The Central Bank of Türkiye increased its benchmark interest rate by 500 basis points to 25% in an effort to control persistently high inflation and stabilize the lira.",
    content: "The Central Bank of the Republic of Türkiye (CBRT) raised its benchmark one-week repo rate by 500 basis points to 25% on Thursday, exceeding market expectations in a decisive move to combat the country's persistent inflation problem.\n\nThe decision marks a significant shift in Türkiye's monetary policy following the reappointment of Governor Hafize Gaye Erkan, who has pledged to return to more conventional economic policies after years of unorthodox approaches that contributed to inflation climbing above 50%.\n\n\"The Monetary Policy Committee has decided to continue the monetary tightening process to establish the disinflation course as soon as possible,\" the central bank said in a statement. \"The Committee is determined to take all necessary steps to bring inflation to the 5% target in the medium term.\"\n\nFollowing the announcement, the Turkish lira strengthened slightly against the U.S. dollar, trading at 31.73 per dollar.",
    source: {
      id: 'src-003',
      name: 'Financial Times',
      reliability: 90,
      logoUrl: 'https://companieslogo.com/img/orig/FTG.L-60ed96bf.png?t=1633439008',
      category: 'Financial News'
    },
    publishedAt: '2023-06-10T10:45:00Z',
    url: 'https://ft.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4',
    category: 'Emerging Markets',
    topics: ['Türkiye', 'Monetary Policy', 'Interest Rates', 'Inflation'],
    sentiment: 'neutral',
    impactLevel: 'high',
    relatedAssets: ['USD/TRY', 'TRY Bonds']
  },
  {
    id: 'news-004',
    title: "Tech Sector Leads Market Rally Amid AI Optimism",
    summary: "Technology stocks are driving a market rally as investors remain optimistic about artificial intelligence applications and potential revenue growth in the sector.",
    content: "Technology stocks led a broad market rally on Wednesday as investors continued to show enthusiasm for companies developing or benefiting from artificial intelligence technologies.\n\nShares of NVIDIA Corp. surged 4.2% to reach a new all-time high, bringing its year-to-date gain to over 180%. The company, whose graphics processing units (GPUs) are essential for training AI models, has been at the forefront of the AI boom.\n\nOther tech giants also saw significant gains, with Microsoft rising 2.7% and Alphabet adding 3.1%. Both companies have made substantial investments in AI and are integrating the technology into their products and services.\n\n\"The market is pricing in expectations for a significant increase in enterprise spending on AI infrastructure and applications,\" said Jane Smith, chief investment strategist at XYZ Capital. \"There's a sense that we're just at the beginning of a multi-year expansion in this technology.\"",
    source: {
      id: 'src-004',
      name: 'Wall Street Journal',
      reliability: 91,
      logoUrl: 'https://companieslogo.com/img/orig/NWSA-37edd6ae.png?t=1633439006',
      category: 'Financial News'
    },
    publishedAt: '2023-06-08T20:10:00Z',
    url: 'https://wsj.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335',
    category: 'Equities',
    topics: ['Technology Stocks', 'Artificial Intelligence', 'Market Rally', 'NVIDIA'],
    sentiment: 'positive',
    impactLevel: 'medium',
    relatedAssets: ['AAPL', 'MSFT', 'NVDA']
  },
  {
    id: 'news-005',
    title: "Gold Prices Reach New Highs on Geopolitical Tensions",
    summary: "Gold prices have surged to record levels as investors seek safe-haven assets amid escalating geopolitical tensions and concerns about economic stability.",
    content: "Gold prices reached an all-time high on Monday, trading above $2,345 per ounce as investors flocked to safe-haven assets amid escalating geopolitical tensions and concerns about global economic stability.\n\nThe precious metal has gained nearly 15% since the beginning of the year, outperforming major stock indices as uncertainties about inflation, interest rate policies, and international conflicts drive demand for traditional store-of-value assets.\n\n\"Gold is fulfilling its historical role as a safe haven during times of uncertainty,\" said Michael Johnson, chief market analyst at Global Precious Metals. \"The combination of persistent inflation concerns, banking sector stress, and geopolitical risks is creating a perfect environment for gold to thrive.\"\n\nAnalysts at several major banks have revised their year-end price targets for gold upward, with some projecting levels above $2,500 per ounce if current trends continue.",
    source: {
      id: 'src-005',
      name: 'CNBC',
      reliability: 89,
      logoUrl: 'https://companieslogo.com/img/orig/CMCSA-e252d8ff.png?t=1633439558',
      category: 'Financial News'
    },
    publishedAt: '2023-06-05T09:20:00Z',
    url: 'https://cnbc.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d',
    category: 'Commodities',
    topics: ['Gold', 'Safe-Haven Assets', 'Inflation', 'Geopolitical Risks'],
    sentiment: 'positive',
    impactLevel: 'medium',
    relatedAssets: ['Gold', 'Silver', 'Mining Stocks']
  },
  {
    id: 'news-006',
    title: "European Commission Revises Eurozone Growth Forecast",
    summary: "The European Commission has lowered its economic growth forecast for the eurozone, citing persistent inflation, tighter monetary policy, and weak consumer confidence.",
    content: "The European Commission on Wednesday revised down its growth forecast for the eurozone economy, predicting GDP expansion of just 0.8% in 2023, compared to the 1.1% projected earlier this year.\n\nThe downward revision reflects ongoing challenges including persistently high inflation, the European Central Bank's monetary tightening cycle, and deteriorating consumer confidence across the 20-nation bloc.\n\n\"The European economy continues to face significant headwinds,\" said Paolo Gentiloni, European Commissioner for Economy. \"While inflation is gradually easing, its persistence is taking a heavier toll than anticipated on households' purchasing power and business activity.\"\n\nThe Commission maintained its inflation forecast at 5.6% for 2023 but noted that price pressures are expected to ease more significantly in 2024, potentially allowing for economic growth to accelerate to 1.4% next year.",
    source: {
      id: 'src-006',
      name: 'The Economist',
      reliability: 93,
      logoUrl: 'https://companieslogo.com/img/orig/ECOBF-8df01fa5.png?t=1633439907',
      category: 'Financial News'
    },
    publishedAt: '2023-06-02T15:40:00Z',
    url: 'https://economist.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc',
    category: 'Economic Outlook',
    topics: ['Eurozone', 'Economic Growth', 'Inflation', 'European Central Bank'],
    sentiment: 'negative',
    impactLevel: 'medium',
    relatedAssets: ['EUR/USD', 'European Equities', 'Euro Government Bonds']
  },
  {
    id: 'news-007',
    title: "Bank of Japan Maintains Ultra-Loose Monetary Policy",
    summary: "The Bank of Japan kept its ultra-loose monetary policy unchanged despite rising inflation, diverging from the global trend of central bank tightening.",
    content: "The Bank of Japan (BOJ) maintained its ultra-loose monetary policy on Friday, keeping short-term interest rates at -0.1% and pledging to guide 10-year government bond yields around 0%, despite rising inflationary pressures in the world's third-largest economy.\n\nThe decision stands in stark contrast to the tightening cycles implemented by most major central banks over the past year and reflects the BOJ's cautious approach to unwinding decades of monetary stimulus.\n\n\"We need to patiently maintain our monetary easing policy to ensure that the positive cycle of wages and prices... firmly takes hold,\" BOJ Governor Kazuo Ueda said at a news conference following the decision.\n\nUeda acknowledged that Japan's inflation rate, which reached 3.1% in May, has exceeded the central bank's 2% target, but emphasized that officials want to see more evidence that price growth is sustainable before adjusting policy.",
    source: {
      id: 'src-007',
      name: 'Nikkei Asia',
      reliability: 90,
      logoUrl: 'https://companieslogo.com/img/orig/NKY-bb89d2ae.png?t=1633437840',
      category: 'Financial News'
    },
    publishedAt: '2023-05-29T11:15:00Z',
    url: 'https://asia.nikkei.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1524821261922-70096358bec8',
    category: 'Monetary Policy',
    topics: ['Bank of Japan', 'Monetary Policy', 'Inflation', 'Japanese Economy'],
    sentiment: 'neutral',
    impactLevel: 'medium',
    relatedAssets: ['USD/JPY', 'Japanese Government Bonds', 'Nikkei 225']
  },
  {
    id: 'news-008',
    title: "IMF Warns of Rising Global Financial Stability Risks",
    summary: "The International Monetary Fund has issued a warning about increasing risks to global financial stability, citing high debt levels, persistent inflation, and banking sector vulnerabilities.",
    content: "The International Monetary Fund (IMF) warned Tuesday that risks to global financial stability have increased over the past six months, despite the resilience shown by the global economy in the face of multiple shocks.\n\nIn its latest Global Financial Stability Report, the IMF highlighted three key vulnerabilities: elevated debt levels across economies, persistent inflation that may require further monetary tightening, and ongoing stress in parts of the banking sector.\n\n\"Financial stability risks remain elevated as the global economy navigates a challenging path toward a soft landing,\" said Tobias Adrian, Financial Counsellor and Director of the IMF's Monetary and Capital Markets Department.\n\nThe report noted that while the immediate banking pressures seen earlier this year have subsided, medium-term challenges remain, particularly for smaller and regional banks that face earnings pressure from higher funding costs and potential loan losses in commercial real estate.",
    source: {
      id: 'src-008',
      name: 'International Monetary Fund',
      reliability: 95,
      logoUrl: 'https://companieslogo.com/img/orig/IMF-f7c7a356.png?t=1633437858',
      category: 'Financial Institutions'
    },
    publishedAt: '2023-05-25T13:30:00Z',
    url: 'https://imf.org/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e',
    category: 'Economic Outlook',
    topics: ['Financial Stability', 'Global Economy', 'Banking Sector', 'Debt Levels'],
    sentiment: 'negative',
    impactLevel: 'high',
    relatedAssets: ['Global Banking Stocks', 'Government Bonds', 'Safe-Haven Assets']
  },
  {
    id: 'news-009',
    title: "China Unveils New Economic Stimulus Package",
    summary: "China has announced a comprehensive stimulus package aimed at boosting economic growth, including infrastructure spending, tax cuts, and measures to support the property sector.",
    content: "China's State Council unveiled a sweeping economic stimulus package on Monday, marking Beijing's most aggressive effort yet to revive growth in the world's second-largest economy as it grapples with a prolonged property crisis and weak consumer spending.\n\nThe package includes 1 trillion yuan ($143 billion) in additional infrastructure spending, targeted tax cuts for small businesses, and new measures to support the troubled property sector, including lower mortgage rates for first-time homebuyers and eased restrictions on home purchases in major cities.\n\n\"These policies aim to expand effective demand, boost confidence, and promote a robust economic recovery,\" said Li Qiang, China's premier, during a press conference announcing the measures.\n\nEconomists at major investment banks described the package as larger than expected, with several revising their growth forecasts for China upward for the remainder of the year. The Chinese economy has struggled to maintain momentum since abandoning its strict zero-COVID policies late last year.",
    source: {
      id: 'src-009',
      name: 'South China Morning Post',
      reliability: 87,
      logoUrl: 'https://companieslogo.com/img/orig/SCMP-b7fd86a0.png?t=1633439839',
      category: 'Financial News'
    },
    publishedAt: '2023-05-22T08:45:00Z',
    url: 'https://scmp.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1553633054-a3269a4e5c66',
    category: 'Economic Outlook',
    topics: ['China', 'Economic Stimulus', 'Infrastructure', 'Property Market'],
    sentiment: 'positive',
    impactLevel: 'high',
    relatedAssets: ['Chinese Equities', 'Commodities', 'AUD/USD', 'Emerging Markets']
  },
  {
    id: 'news-010',
    title: "Tesla Announces Major Expansion of Supercharger Network",
    summary: "Tesla has revealed plans to double its global Supercharger network over the next two years, supporting its growing vehicle fleet and addressing charging infrastructure concerns.",
    content: "Tesla announced on Thursday an ambitious plan to more than double its global Supercharger network over the next two years, addressing one of the key concerns for potential electric vehicle buyers: charging infrastructure.\n\nThe expansion will add over 10,000 new Supercharger stalls worldwide, with a significant focus on urban centers and highway corridors in North America, Europe, and Asia. The company also plans to increase the power output of new Superchargers to up to 350 kW, allowing for faster charging times.\n\n\"Access to convenient and reliable charging remains one of the biggest factors in EV adoption,\" said Tesla CEO Elon Musk during the announcement. \"This expansion will support our growing vehicle fleet and make electric vehicle ownership even more convenient.\"\n\nThe company also confirmed that it will continue opening its Supercharger network to non-Tesla vehicles in more markets, following successful pilot programs in Europe and limited locations in North America.",
    source: {
      id: 'src-010',
      name: 'TechCrunch',
      reliability: 85,
      logoUrl: 'https://companieslogo.com/img/orig/TCHC-35d09c94.png?t=1633439842',
      category: 'Technology News'
    },
    publishedAt: '2023-05-18T16:20:00Z',
    url: 'https://techcrunch.com/article-url',
    imageUrl: 'https://images.unsplash.com/photo-1620085303288-20698c243035',
    category: 'Equities',
    topics: ['Tesla', 'Electric Vehicles', 'Charging Infrastructure', 'Sustainable Energy'],
    sentiment: 'positive',
    impactLevel: 'medium',
    relatedAssets: ['TSLA', 'EV Manufacturers', 'Lithium Producers', 'Clean Energy ETFs']
  },
  {
    id: 'news-011',
    title: "Apple Announces Significant Investment in AI Research",
    summary: "Apple has committed $5 billion to artificial intelligence research and development over the next three years, signaling a major push into the competitive AI landscape.",
    content: "Apple Inc. announced on Tuesday a significant expansion of its artificial intelligence initiatives, committing $5 billion over the next three years to research and development in generative AI and other advanced machine learning technologies.\n\nThe investment includes the establishment of a new AI research center in Seattle, the hiring of hundreds of AI specialists, and partnerships with leading academic institutions. This marks Apple's most substantial public commitment to AI development amid growing competition from Microsoft, Google, and other tech giants.\n\n\"AI represents one of the most profound opportunities for Apple and our users,\" said Apple CEO Tim Cook during the announcement. \"We believe in the transformative power of this technology when developed responsibly and centered on human values.\"\n\nThe company indicated that AI features would be integrated across its product ecosystem, including iOS, macOS, and its services offerings, with initial capabilities expected to debut in software updates later this year.",
    source: {
      id: 'src-011',
      name: 'Bloomberg',
      reliability: 92,
      logoUrl: 'https://companieslogo.com/img/orig/BBAX-3c68febd.png?t=1633439869',
      category: 'Financial News'
    },
    publishedAt: '2023-06-14T09:15:00Z',
    url: 'https://bloomberg.com/apple-ai-investment',
    imageUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d',
    category: 'Technology',
    topics: ['Apple', 'Artificial Intelligence', 'Tech Investment', 'Innovation'],
    sentiment: 'positive',
    impactLevel: 'high',
    relatedAssets: ['AAPL', 'Tech ETFs', 'MSFT', 'GOOGL']
  },
  {
    id: 'news-012',
    title: "ECB President Signals End to Rate Hikes as Inflation Cools",
    summary: "European Central Bank President Christine Lagarde indicated that the bank's rate hiking cycle may be nearing its end as inflation in the eurozone shows signs of moderating.",
    content: "European Central Bank President Christine Lagarde suggested on Monday that the ECB's aggressive interest rate hiking campaign may be approaching its conclusion as inflation in the eurozone begins to moderate from recent peaks.\n\nSpeaking at an economic forum in Frankfurt, Lagarde noted that while inflation remains above the bank's 2% target, recent data indicates a \"positive trajectory\" that could allow policymakers to pause their tightening cycle after the July meeting.\n\n\"We are seeing encouraging signs that the underlying price pressures are starting to ease,\" Lagarde said. \"However, we remain data-dependent and vigilant to ensure that inflation returns to our medium-term target in a timely manner.\"\n\nEurozone inflation fell to 5.5% in June, down from 6.1% in May, according to preliminary data from Eurostat. Core inflation, which excludes volatile food and energy prices, also eased slightly to 5.4% from 5.6%.",
    source: {
      id: 'src-012',
      name: 'Financial Times',
      reliability: 90,
      logoUrl: 'https://companieslogo.com/img/orig/FTG.L-60ed96bf.png?t=1633439008',
      category: 'Financial News'
    },
    publishedAt: '2023-06-13T11:30:00Z',
    url: 'https://ft.com/ecb-rates-inflation',
    imageUrl: 'https://images.unsplash.com/photo-1518544382021-2f15153bce6a',
    category: 'Monetary Policy',
    topics: ['European Central Bank', 'Interest Rates', 'Inflation', 'Eurozone'],
    sentiment: 'positive',
    impactLevel: 'high',
    relatedAssets: ['EUR/USD', 'European Bank Stocks', 'Euro Government Bonds']
  },
  {
    id: 'news-013',
    title: "Brazil Unveils $100 Billion Infrastructure Investment Plan",
    summary: "Brazil's government has announced a massive infrastructure program focused on transportation, energy, and urban development to boost economic growth and create jobs.",
    content: "The Brazilian government on Friday unveiled an ambitious $100 billion infrastructure investment plan aimed at modernizing the country's transportation networks, expanding renewable energy capacity, and improving urban development over the next five years.\n\nThe program, named \"Crescer Brasil\" (Grow Brazil), represents the largest infrastructure initiative in the country in over a decade and will be funded through a combination of public spending, private investment, and international development loans.\n\n\"This plan will not only address critical infrastructure gaps but also create millions of jobs and enhance Brazil's competitiveness in the global economy,\" said President Luiz Inácio Lula da Silva during the announcement ceremony in Brasília.\n\nThe initiative includes $35 billion for highways, railways, and ports; $30 billion for renewable energy projects; $25 billion for urban mobility and housing; and $10 billion for digital infrastructure and connectivity in underserved regions.",
    source: {
      id: 'src-013',
      name: 'Reuters',
      reliability: 94,
      logoUrl: 'https://companieslogo.com/img/orig/TRI-3af08c13.png?t=1652775420',
      category: 'Financial News'
    },
    publishedAt: '2023-06-11T13:45:00Z',
    url: 'https://reuters.com/brazil-infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1554344056-3914939f7255',
    category: 'Emerging Markets',
    topics: ['Brazil', 'Infrastructure', 'Economic Development', 'Latin America'],
    sentiment: 'positive',
    impactLevel: 'medium',
    relatedAssets: ['Brazilian Real', 'EWZ', 'Latin American ETFs', 'Construction Stocks']
  },
  {
    id: 'news-014',
    title: "Global Semiconductor Shortage Expected to Persist Through 2024",
    summary: "Industry experts predict the worldwide semiconductor shortage will continue well into 2024, affecting automotive, consumer electronics, and industrial sectors despite capacity expansions.",
    content: "The global semiconductor shortage that has disrupted multiple industries is expected to persist through 2024, according to a comprehensive report released Wednesday by the Semiconductor Industry Association (SIA).\n\nDespite significant investments in new manufacturing capacity, growing demand for chips in artificial intelligence, cloud computing, automotive electronics, and 5G applications continues to outpace supply growth in key semiconductor categories.\n\n\"While we're seeing improvements in some segments of the market, structural imbalances between supply and demand remain in high-performance computing chips, power management ICs, and certain analog components,\" said SIA President John Neuffer.\n\nThe report forecasts that the automotive sector will continue to face the most severe impacts, with the average vehicle now containing over 1,400 semiconductor chips. Consumer electronics manufacturers are also expected to encounter constraints, potentially affecting product availability during peak shopping seasons.",
    source: {
      id: 'src-014',
      name: 'Wall Street Journal',
      reliability: 91,
      logoUrl: 'https://companieslogo.com/img/orig/NWSA-37edd6ae.png?t=1633439006',
      category: 'Financial News'
    },
    publishedAt: '2023-06-07T16:20:00Z',
    url: 'https://wsj.com/semiconductor-shortage',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea',
    category: 'Technology',
    topics: ['Semiconductors', 'Supply Chain', 'Manufacturing', 'Technology Hardware'],
    sentiment: 'negative',
    impactLevel: 'high',
    relatedAssets: ['SMH', 'TSM', 'INTC', 'Automotive Stocks']
  },
]