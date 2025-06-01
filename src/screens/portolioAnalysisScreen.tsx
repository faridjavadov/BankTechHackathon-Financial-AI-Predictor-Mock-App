import React, { useState } from 'react';
import { portfolioAnalysis } from '../data/mockPortfolios';

const PortfolioAnalysisScreen: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'allocation' | 'performance' | 'recommendations'>('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
  };

  const renderPerformanceIndicator = (value: number) => {
    if (value > 0) {
      return <span className="text-green-600">↑ {value.toFixed(2)}%</span>;
    } else if (value < 0) {
      return <span className="text-red-600">↓ {Math.abs(value).toFixed(2)}%</span>;
    } else {
      return <span className="text-gray-600">0.00%</span>;
    }
  };

  const renderActionBadge = (action: 'buy' | 'sell' | 'hold') => {
    switch (action) {
      case 'buy':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">AL</span>;
      case 'sell':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">SAT</span>;
      case 'hold':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">TUT</span>;
    }
  };

  const renderRiskScore = (score: number) => {
    let bgColor = '';
    if (score <= 3) bgColor = 'bg-green-200';
    else if (score <= 6) bgColor = 'bg-yellow-200';
    else bgColor = 'bg-red-200';

    return (
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`h-2.5 rounded-full ${bgColor}`} style={{ width: `${score * 10}%` }}></div>
        </div>
        <span className="ml-2 text-sm">{score}/10</span>
      </div>
    );
  };

  // Basit CSS ile pasta grafik oluşturma
  const renderPieChart = (data: { assetType: string; percentage: number; }[], title: string) => {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
    
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
            {data.map((item, index) => {
              let rotation = 0;
              for (let i = 0; i < index; i++) {
                rotation += data[i].percentage * 3.6; // 1% = 3.6 derece
              }
              return (
                <div 
                  key={index}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: `conic-gradient(${colors[index % colors.length]} ${rotation}deg, ${colors[index % colors.length]} ${rotation + item.percentage * 3.6}deg, transparent ${rotation + item.percentage * 3.6}deg)`
                  }}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 mr-2 rounded-sm" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm">{item.assetType}: {item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Basit CSS ile bar grafik oluşturma
  const renderBarChart = (data: { region: string; percentage: number; }[], title: string) => {
    const maxPercentage = Math.max(...data.map(item => item.percentage));
    
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.region}</span>
                <span>{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-blue-600" 
                  style={{ width: `${(item.percentage / maxPercentage) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Basit CSS ile line grafik oluşturma
  const renderLineChart = (dates: string[], values: number[], title: string) => {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="h-64 flex items-end space-x-1">
          {values.map((value, index) => {
            const height = ((value - minValue) / range) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${height}%` }}
                />
                <div className="text-xs mt-1 transform -rotate-45 origin-top-left">{dates[index]}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-between">
          <div className="text-sm text-gray-500">Min: {formatCurrency(minValue)}</div>
          <div className="text-sm text-gray-500">Max: {formatCurrency(maxValue)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Portföy Analizi</h1>
      
      {/* Tab navigasyonu */}
      <div className="mb-6">
        <nav className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-blue-500'}`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-4 py-2 font-medium ${activeTab === 'assets' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-blue-500'}`}
          >
            Varlıklarım
          </button>
          <button
            onClick={() => setActiveTab('allocation')}
            className={`px-4 py-2 font-medium ${activeTab === 'allocation' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-blue-500'}`}
          >
            Dağılım
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 font-medium ${activeTab === 'performance' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-blue-500'}`}
          >
            Performans
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 font-medium ${activeTab === 'recommendations' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-blue-500'}`}
          >
            Tavsiyeler
          </button>
        </nav>
      </div>

      {/* Genel Bakış sekmesi */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portföy özet kartı */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Portföy Özeti</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Toplam Değer:</span>
                <span className="font-semibold">{formatCurrency(portfolioAnalysis.summary.totalValue)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Toplam Yatırım:</span>
                <span>{formatCurrency(portfolioAnalysis.summary.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Toplam Kar/Zarar:</span>
                <span className={portfolioAnalysis.summary.totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(portfolioAnalysis.summary.totalProfitLoss)} ({portfolioAnalysis.summary.totalProfitLossPercentage.toFixed(2)}%)
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Günlük Değişim:</span>
                <span className={portfolioAnalysis.summary.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(portfolioAnalysis.summary.dailyChange)} ({portfolioAnalysis.summary.dailyChangePercentage.toFixed(2)}%)
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Beklenen ROI:</span>
                <span className={portfolioAnalysis.summary.expectedROI >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {portfolioAnalysis.summary.expectedROI.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Risk Skoru:</span>
                <div className="w-32">
                  {renderRiskScore(portfolioAnalysis.summary.riskScore)}
                </div>
              </div>
            </div>
          </div>

          {/* Varlık dağılımı grafiği */}
          {renderPieChart(portfolioAnalysis.assetAllocation, "Varlık Dağılımı")}

          {/* Performans geçmişi grafiği */}
          <div className="md:col-span-2">
            {renderLineChart(
              portfolioAnalysis.performanceHistory.dates, 
              portfolioAnalysis.performanceHistory.values, 
              "Performans Geçmişi"
            )}
          </div>
        </div>
      )}

      {/* Varlıklarım sekmesi */}
      {activeTab === 'assets' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Portföy Varlıkları</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Varlık</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miktar</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alış Fiyatı</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Güncel Fiyat</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Değer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kar/Zarar</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beklenen ROI</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tavsiye</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {portfolioAnalysis.assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                          <div className="text-sm text-gray-500">{asset.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.purchasePrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.currentPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{formatCurrency(asset.currentValue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={asset.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(asset.profitLoss)} ({renderPerformanceIndicator(asset.profitLossPercentage)})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderPerformanceIndicator(asset.expectedROI)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-24">
                        {renderRiskScore(asset.riskScore)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderActionBadge(asset.recommendedAction)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dağılım sekmesi */}
      {activeTab === 'allocation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Varlık türü dağılımı */}
          {renderPieChart(portfolioAnalysis.assetAllocation, "Varlık Türü Dağılımı")}

          {/* Sektör dağılımı */}
          {renderPieChart(
            portfolioAnalysis.sectorAllocation.map(item => ({ 
              assetType: item.sector, 
              percentage: item.percentage 
            })), 
            "Sektör Dağılımı"
          )}

          {/* Coğrafi dağılım */}
          <div className="md:col-span-2">
            {renderBarChart(
              portfolioAnalysis.geographicAllocation.map(item => ({ 
                region: item.region, 
                percentage: item.percentage 
              })), 
              "Coğrafi Dağılım"
            )}
          </div>
        </div>
      )}

      {/* Performans sekmesi */}
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performans grafiği */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Performans Geçmişi</h2>
            <div className="flex space-x-2 mb-4">
              <button 
                className={`px-3 py-1 rounded ${timeFrame === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeFrame('day')}
              >
                Gün
              </button>
              <button 
                className={`px-3 py-1 rounded ${timeFrame === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeFrame('week')}
              >
                Hafta
              </button>
              <button 
                className={`px-3 py-1 rounded ${timeFrame === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeFrame('month')}
              >
                Ay
              </button>
              <button 
                className={`px-3 py-1 rounded ${timeFrame === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeFrame('year')}
              >
                Yıl
              </button>
            </div>
            <div className="h-64">
              {renderLineChart(
                portfolioAnalysis.performanceHistory.dates, 
                portfolioAnalysis.performanceHistory.values, 
                ""
              )}
            </div>
          </div>

          {/* Risk analizi */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Risk Analizi</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Volatilite:</span>
                <span>{portfolioAnalysis.riskAnalysis.volatility}%</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Sharpe Oranı:</span>
                <span>{portfolioAnalysis.riskAnalysis.sharpeRatio}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Maksimum Düşüş:</span>
                <span>{portfolioAnalysis.riskAnalysis.maxDrawdown}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Çeşitlendirme Skoru:</span>
                <div className="w-32">
                  {renderRiskScore(portfolioAnalysis.riskAnalysis.diversificationScore)}
                </div>
              </div>
            </div>
          </div>

          {/* Performans karşılaştırması */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Performans Karşılaştırması</h2>
            {renderBarChart(
              [
                { region: 'Portföyünüz', percentage: portfolioAnalysis.summary.totalProfitLossPercentage },
                { region: 'BIST 100', percentage: 12.4 },
                { region: 'S&P 500', percentage: 7.8 },
                { region: 'Enflasyon', percentage: 38.2 }
              ],
              ""
            )}
          </div>
        </div>
      )}

      {/* Tavsiyeler sekmesi */}
      {activeTab === 'recommendations' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Portföy Tavsiyeleri</h2>
          <div className="mb-6 p-4 bg-blue-50 rounded">
            <p className="text-gray-700">{portfolioAnalysis.recommendations.summary}</p>
          </div>
          
          <h3 className="text-lg font-medium mb-3">Önerilen Eylemler</h3>
          <div className="space-y-4">
            {portfolioAnalysis.recommendations.actions.map((action, index) => {
              const asset = portfolioAnalysis.assets.find(a => a.id === action.assetId);
              return (
                <div key={index} className="border p-4 rounded hover:bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium">{asset?.symbol}</span> - {asset?.name}
                    </div>
                    {renderActionBadge(action.action)}
                  </div>
                  <p className="text-sm text-gray-600">{action.reasoning}</p>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Güncel Fiyat: {asset?.currentPrice.toFixed(2)}</span>
                    <span>Beklenen ROI: {renderPerformanceIndicator(asset?.expectedROI || 0)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalysisScreen;