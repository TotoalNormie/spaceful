import React from 'react';
import css from "../style/Reports.module.css";

const Reports = () => {
	return (
        <>
            <div className={css.mainContainer}>
                <h1 className={css.h1}> "Warehouse name" reports</h1>  
                <div className={css.chartsContainer}>
                    <div className={css.chart}>chart1</div>
                    <div className={css.chart}>chart2</div>
                </div>
                <div className={css.reportsContainer}>
                    <div className={css.report}>
                        <div className={css.reportTitle}>Closed orders</div>
                        <div className={css.reportCount}>128</div>
                    </div>
                    <div className={css.report}>
                        <div className={css.reportTitle}>Products in warehouse</div>
                        <div className={css.reportCount}>93</div>
                    </div>
                    <div className={css.report}>
                        <div className={css.reportTitle}>Open orders</div>
                        <div className={css.reportCount}>12</div>
                    </div>
                </div>
                <button className={css.convertButton}>Convert to xml</button>
            </div>
        </>
    )


}

export default Reports;