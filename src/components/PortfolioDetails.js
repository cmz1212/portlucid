import React from 'react';

function PortfolioDetails({ portfolio, exclRebalancing }) {
    return (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-20 gap-y-5">
            <div className="flex flex-col">
            <div className="flex justify-between"><span className="font-semibold">{`Return (1-mth):`}</span><span className="text-right">{ exclRebalancing[portfolio.portfolio_id] ? portfolio.ret_1m_worebal : portfolio.ret_1m_wrebal }</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Return (3-mth):`}</span><span className="text-right">{ exclRebalancing[portfolio.portfolio_id] ? portfolio.ret_3m_worebal : portfolio.ret_3m_wrebal }</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Return (6-mth):`}</span><span className="text-right">{ exclRebalancing[portfolio.portfolio_id] ? portfolio.ret_6m_worebal : portfolio.ret_6m_wrebal }</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Return (12-mth):`}</span><span className="text-right">{ exclRebalancing[portfolio.portfolio_id] ? portfolio.ret_12m_worebal : portfolio.ret_12m_wrebal }</span></div>
            </div>
            <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`Hist Vol:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">Historical Daily Volatility</span></span>
                <span className="text-right">{portfolio.volatility}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`Hist VaR:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Historical VaR</span></span>
                <span className="text-right">{portfolio.hist_var}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`Para VaR:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Parametric VaR</span></span>
                <span className="text-right">{portfolio.para_var}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`MC   VaR:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Monte Carlo VaR</span></span>
                <span className="text-right">{portfolio.mc_var}</span>
            </div>
            </div>
            <div className="flex flex-col">
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`Max  DD:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">Maximum Drawdown</span></span>
                <span className="text-right">{portfolio.max_dd}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`Hist ES:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Expected Shortfall</span></span>
                <span className="text-right">{portfolio.hist_es}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`Para ES:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Expected Shortfall</span></span>
                <span className="text-right">{portfolio.para_es}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold relative group">{`MC   ES:`}<span style={{whiteSpace:'nowrap'}} className="absolute top-0 -mt-7 -left-5 p-2 bg-zinc-800 text-white text-xs opacity-0 group-hover:opacity-90 pointer-events-none rounded-md transition-opacity duration-200">95% 5-Day Expected Shortfall</span></span>
                <span className="text-right">{portfolio.mc_es}</span>
            </div>
            </div>
            <div className="flex flex-col">
            <div className="flex justify-between"><span className="font-semibold">{`Benchmark:`}</span><span className="text-right">{portfolio.benchmark}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Alpha:`}</span><span className="text-right">{portfolio.alpha}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Beta:`}</span><span className="text-right">{portfolio.beta}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`R-Squared:`}</span><span className="text-right">{portfolio.r_squared}</span></div>
            </div>
            <div className="flex flex-col">
            <div className="flex justify-between"><span className="font-semibold">{`Sharpe Ratio:`}</span><span className="text-right">{portfolio.sharpe}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Sortino Ratio:`}</span><span className="text-right">{portfolio.sortino}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Treynor Ratio:`}</span><span className="text-right">{portfolio.treynor}</span></div>
            </div>
            <div className="flex flex-col">
            <div className="flex justify-between"><span className="font-semibold">{`P/E Ratio:`}</span><span className="text-right">{portfolio.pe_ratio}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`P/S Ratio:`}</span><span className="text-right">{portfolio.ps_ratio}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`D/E Ratio:`}</span><span className="text-right">{portfolio.de_ratio}</span></div>
            <div className="flex justify-between"><span className="font-semibold">{`Int Cov Ratio:`}</span><span className="text-right">{portfolio.intcov_ratio}</span></div>
            </div>
        </div>
  );
}

export default PortfolioDetails;