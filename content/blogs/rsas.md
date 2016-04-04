---
Title: R-CRAN Data Export
Description:
Template: blog
Date: April 4th, 2016
Lastupdated: April 4th, 2016
Category: blog
---

R is a great tool for business analysts especially those with programmable ability. I'm not here to
talk about the pros and cons, but it is definitely comparable to Python and SAS. This assumes some familiarity
with R, but it isn't required since the syntax is much like any other language. If you plan on using it
please make sure you have it installed and the packages imported.

While R is as good as it gets, there are times when we need some data put into a SAS data format. 
For this problem, let us assume we would like a standard comma-separated file
transformed to a SAS. For this problem, you have two packages that allow this inside R: SASXPORT and FOREIGN.
One could use SAS to do the conversion, however I found using the SAS language 
less robust, or perhaps the query-esque syntax was too unintuitive. 

One last thing is that the goal for any script like this should be made with accessibility and
automation in consideration. We will first start with the one I chose not to use then proceed to 
the last option.

### 1) [XPORT](http://www.inside-r.org/packages/cran/sasxport/docs/write.xport) 
First, let us assume that we have read our CSV file into a data frame:
```r
filename <- 'input.csv'
csvFrame <- read.csv(filename,sep=",",head=true)  //requires foreign
```
where the sep denotes the delimiter, and head denotes whether the first line is a header.

Next we call the write.xport function using the function provided by SASXPORT:
```r
SAStype(csvFrame) <- 'TYPENAME'
# create a SAS XPORT file
xpt <- "xport.sas"
write.xport(csvFrame, file = xpt, sasVer="9.3" ) //requires SASxport
```
`SAStype` creates an attribute to the data frame. 
It is good practice to set a few attributes, as shown by the
[documentation](http://www.inside-r.org/packages/cran/sasxport/docs/write.xport) 
though not all necessary. When calling write.xport(from SASxport), it is reccommended 
to set the sasVer to the targetted version.


Easy right? Well, indeed there are no issues at first glance. So let's talk about the first one.
`xpt<-"xport.sas"` (which sets a variable to a filename) itself is correct,
however through testing, it seems it is sometimes required
to set the filename with a .xpt extention.

The last issue is ofcourse, accessibility. Although I have not played around with all componentry of SAS,
I found that importing a XPT file requires manually going clicking through the GUI and importing it, which is a
big no. Though you can use it during the sas session, and it may be possible to convert it to a .sas .sas7dbat,
it is extra work, and handing an .xpt file is inconvenient to whom 
who simply wants to double click a .sas file and have it open up.


### 2) [FOREIGN](http://www.inside-r.org/r-doc/foreign/write.foreign)

Let us assume we have initialized `csvFrame` like before.
```
csv <- "outputdir/output.csv"
sas <- "outputdir/output.sas"
#Write file
#SAStype(csvFrame) <- 'MYTYPE' //optional
write.foreign(df=csvFrame,datafile=csv,codefile=sas,
              package="SAS",dataname=filename,libpath=lpath)

###df = input data frame
###datafile = output csv file
###codefile = output sas file
###dataname = optional parameter
###libpath = optional parameter
```

First, we set the output file names. Then, call the write function with 
the right parameters. The optional parameters denote the `library name` and
`library path` when you open the sas file. Important if you would like to keep your
files organized.

The confusing aspect of this is, why two output files? The way foreign
package deals with exporting to SAS is they separate the attributes
with the actual data. However it works the way the user expects, in that double clicking out.sas 
brings up the data in SAS.


This great package comes with a mixed blessing, as it indeed check for what sort of input it is being fed.
Having worked with this package for a large project, some errors that may happen is the header.

As it expects a header, you header MUST be unique when truncated to 8 or 32 characters (depending on the VAR max length
of your current SAS version, set by attribute). The way the package
does this is by starting at the right. If the first 32 characters of a header name are the same, then
write will fail. The only work around is modifying the CSV file header and also to have good variable names.
This is required because the VARIABLE names that are part of the sas file can only have that length,
but the actual header can be much longer than 32 characters. You can see this in action
through using a debugger going through the function.

Another aspect is all rows after the header must have the same number of columns as the header, else the entire
process will fail (even if it is just one data entry!). This strict behavior is very inflexible and can lead to some issues.
The only way around it being again fixing the input file.


### Conclusion

XPORT is a quicker solution as well as a nice example being provided in documentation. However, 
lasting software implementation that includes guarantees will likely find themselves using the foreign package with its
extra features, and since you are implementating a large solution anyway, input data checking should already be done prior
to export.



