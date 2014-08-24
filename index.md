---
title       : HealthMap
subtitle    : Developing Data Products Course Project
author      : Michael Liquori
job         : Developer
framework   : io2012        # {io2012, html5slides, shower, dzslides, ...}
highlighter : highlight.js  # {highlight.js, prettify, highlight}
hitheme     : tomorrow      # 
widgets     : []            # {mathjax, quiz, bootstrap}
mode        : selfcontained # {standalone, draft}
knit        : slidify::knit2slides
--- 

## Motivation / Further Applications
International corporations and marketers have to deal with a wide variety of markets and must adapt their expectations of sales in those markets based on the macroeconomic facts of each economy. 

They must also focus their attentions and budgets on the economies with the highest potential and growth. 

This app makes segmenting markets and tracking growth statistics much simpler and more visually-pleasing, as well as web-accessible, than the old-fashioned method of sorting through Excel files.

This application could be easily adapted for internal use by international companies and marketers to map and track growth rates of different sets of data, including internal/proprietary sales figures.

Please view the app at <a href=http://mliq.shinyapps.io/HealthMap/>http://mliq.shinyapps.io/HealthMap/</a>.
<br>
Source Code is viewable on GitHub at: <a href=http://github.com/mliq/HealthMap/tree/Add-Calculation>http://github.com/mliq/HealthMap/tree/Add-Calculation</a>

---
## Features/Usage - Map
At top an interactive chloropleth world map is displayed which colors nations based on Annual Healthcare Spending Per Capita by country for 2010, 2011, or 2012. 
<img src=assets/img/SNAG-0020.png width=600>
<br>
2012 is the default, and below the map is a slider to change the year of data reflected in the map. To the right of the slider is the legend, indicating that red are countries with low spending, yellow in the middle, and green for the highest spending countries. Hovering with the mouse over any country in the map displays the name of the country and the corresponding data.

---
## Features/Usage - Calculations
Below the map is a "Calculate Growth Rates" widget which allows the user to select a country, either by drop-down selection or by clicking and typing in a name. That country's Annual Healthcare Spending Per Capita data will then be displayed, and below that the percentage annual growth rates are calculated and displayed. Below this table the average of the two annual growth rates is calculated and displayed. To the right of the "Calculate Growth Rates" widget is the complete data table with the countries and their annual spending in each year. This table is sortable by clicking on the column heading for both ascending or descending sort.
<br>
<img src=assets/img/SNAG-0021.png><img src=assets/img/SNAG-0022.png>

---
## Calculations Code
For this I created a new function which generates the calculations, rounds them to two decimal places, and returns a new data.frame. For example:

```r
    y1<-894.41; y2<-1021.61; y3<-1103.36; 
    g1<-100*((y2-y1)/y1); g1<-as.numeric(format(round(g1, 2), nsmall = 2)) 
    g2<-((y3-y2)/y2)*100; g2<-as.numeric(format(round(g2, 2), nsmall = 2))
    avg<-((g1+g2)/2)
    df<-data.frame(rbind(c("2010","2011","2012"),c("YoY Growth % :",g1,g2)),check.rows = FALSE,check.names=FALSE)
    print(df);paste("Avg. Growth % ",avg)
```

```
##                1     2    3
## 1           2010  2011 2012
## 2 YoY Growth % : 14.22    8
```

```
## [1] "Avg. Growth %  11.11"
```

---
## Features/Usage - Data Table
To the right of the "Calculate Growth Rates" widget is the complete data table with the countries and their annual spending in each year. This table is sortable by clicking on the column heading for both ascending or descending sort.
<br><br>
<img src=assets/img/SNAG-0022.png>

---
## Further Applications
This application could be easily adapted for internal use by international companies and marketers to map and track growth rates of different sets of data, including internal/proprietary sales figures.

Please view the app at <a href=http://mliq.shinyapps.io/HealthMap/>http://mliq.shinyapps.io/HealthMap/</a>.
<br><br>
Source Code is viewable on GitHub at: <a href=http://github.com/mliq/HealthMap/tree/Add-Calculation>http://github.com/mliq/HealthMap/tree/Add-Calculation</a>
<br>
