:title: Introducing the Sinclair Broadcast Group
:date: 2017-08-30 12:00
:tags: sinclair, last week tonight
:category: Stories
:slug: sinclair_1_3
:author: Dawid Minorczyk
:summary: The first part in a three part series examining the Sinclair Broadcast Group and their affect on American political sentiment.
:picture: images/Sinclair_Header.png
:sortorder: 2
:d3_v3:
:d3topo:
:scripts: nielsen_dma_d3.js
:styles: nielsen_dma_d3.css

.. |br| raw:: html

  <br \>

.. class:: head-info

  *This post is the first in a three part series on the Sinclair Broadcast Group. I will be posting
  links to the second and third parts here once I finish them.*

  *I skim over a lot of technical work in this post. If you want to see the code that generated
  the graphs I show, try looking through*
  `this notebook on Sinclair stations <sinclair-station-exploration.html>`_
  *or*
  `this notebook on DMAs and how they apply to Sinclair <sinclair-dma-exploration.html>`_
  *.*

Introducing the Sinclair Broadcast Group
========================================

Do you remember broadcast television? Yes, that ancient technology the internet completely replaced
like 10 years ago? Oh boy, those were the days. Saturday morning cartoons; watching *How It's Made*
episodes about styrofoam; local news stories about that one guy who tried to
sell himself on eBay. Today, of course, it's pretty obvious that Facebook and Twitter have
completely supplanted TV's role as ...

What's that?

Only the younger population is `watching less TV`_? People 40 and over watch `about as much TV`_ 
today as they did 5 years ago? Traditional TV still makes up the
`single largest video consumption source`_ in the US? [#]_

.. _`watching less TV`:
  http://www.marketingcharts.com/featured-24817/attachment/nielsen-traditional-tv-viewing-by-age-q12011-q12017-jul2017
.. _`about as much TV`:
  http://www.marketingcharts.com/featured-24817/attachment/nielsen-traditional-tv-viewing-trends-by-age-group-in-q1-2017-jul2017
.. _`single largest video consumption source`:
  http://www.marketingcharts.com/featured-24817/attachment/nielsen-video-viewing-by-device-in-q42016-jul2017

Yup! Even in the age of social media, millions of American still get their entertainment and news
from sources other than tweets and newsfeeds. While I personally found this surprising (I'm a
classic example of a cord cutter), it seems hosts of popular HBO news shows were already in the 
know.

I'm talking, of course, about John Oliver and his show *Last Week Tonight*. He recently talked about
broadcast television and local news. No, it wasn't an in depth exposition on that guy who tried to
sell himself on eBay (I wish). Instead, John looked into political bias in our local news broadcasts
by examining the Sinclair Broadcast Group, or as he called it: "Maybe the most influential media
company that you've never heard of." [#]_

For the uninitiated (or those that don't have HBO), here's a bullet point summary of the episode:

- The Sinclair Broadcast Group is the largest owner of local TV stations in the country, yet not
  many Americans have heard about the company before. 
- Sinclair is currently in the process of `acquiring Tribune Media`_, which would increase its 
  holdings by 42 TV stations.
- Sinclair forces the stations that it owns to broadcast content labeled as *must runs* on a regular
  basis.
- The *must runs*, John argues, show a clear conservative slant. I don't really want to get into
  this, but if you want to know more, Wikipedia has a `brief description`_ of these editorials and
  their content.

.. _`acquiring Tribune Media`:
  http://www.latimes.com/business/hollywood/la-fi-ct-tribune-sinclair-20170508-story.html
.. _`brief description`:
  https://en.wikipedia.org/wiki/Sinclair_Broadcast_Group#Political_views

This episode of *Last Week Tonight* serves as a starting point for the rest of this post. After
seeing the episode, I really wanted to know more. So what if John is right? What if Sinclair
really *does* present a conservative slant. Does it matter?  Yes, there's that whole 
journalistic-integrity-in-local-news thing on the line, but are there other consequences? For 
example, can Sinclair affect how many people vote and who they vote for?

These are the questions I'll try to answer below; hopefully you'll stay along for the ride.

The General Plan
~~~~~~~~~~~~~~~~

We've known for a while that media plays a pretty large role in affecting political views [#]_ [#]_
(with the notable exception of social media, which doesn't seem to change political views as much as
affirm existing ones [#]_ [#]_). However, controlled studies measuring exactly *how much* a specific
medium can shift votes are few and far in between.

This is where the Sinclair Broadcast Group comes in. The fact that Sinclair does not broadcast its
*must runs* to every location in the United States, only to locations where they have a nearby TV
station, means that the company is fundamentally a nationwide natural experiment and that teasing
out the information we want is, in theory, pretty simple. We just need to follow these steps:

1. Find all pairs of counties in the US where one county has never had access to Sinclair 
   programming but the second one has. We use counties as our standard unit of measurement because
   we want to be as fine-grained as possible while still having access to complete voting data.
2. Out of all those county pairs, we keep only the ones that were politically similar *before* 
   Sinclair acquired a station in the area. I'll define what "politically similar" means formally
   later on, but we basically want to look for counties that have similar demographics and voting
   records.
3. Look at the voting patterns of the two counties *after* Sinclair buys a TV station in one of
   them and test to see if the voting patterns begin to differ (and if they do, by how much).

Ok, you got me, these steps aren't that simple. However, using this approach should get us some
strong evidence either for or against Sinclair and their effect on American politics. Also, I'll
be doing all the work, so no complaining!

Some Background Information on Sinclair
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Before we take on the daunting task of trying to measure "political similarity" (step **2** above),
we need to get a better look at the Sinclair Broadcast Group itself; specifically, we want to know
both *where* its stations are located as well as *when* Sinclair built/acquired each station. I'll
make exploring this (step **1**) the focus of the rest of this post.

So, How Many TV Stations Does Sinclair Own?
-------------------------------------------

That's easy, the answer is 173 [#]_! Erm, no wait, 285 [#]_? Maybe 139 [#]_?

As it turns out, even this seemingly simple question is a bit tough to answer. For example, consider
the TV stations WTTO and WBDD, both located in Alabama. Since Sinclair acquired the stations in 
1995, WBDD has broadcast (mostly) the same content as WTTO. In TV jargon, WBDD is called a 
`satellite station`_ of WTTO. Should we count these two as separate stations? 

Moreover, what about stations that Tribune Media currently owns, but that Sinclair is in the process
of buying? Should we count those? 

Then there's also the problem of `local marketing agreements`_, which allow one entity to own a
station, but another to operate it (choose the programming). How should we count these?

.. _`satellite station`:
  https://en.wikipedia.org/wiki/Broadcast_relay_station#Satellite_stations

.. _`local marketing agreements`:
  https://en.wikipedia.org/wiki/Local_marketing_agreement

Luckily for us, Wikipedia already filtered these options for us. According to the data found there,
173 stations is the correct number. This number double counts satellite stations (so WBDD and WTTO
count as two separate stations), does not include stations that Tribune Media currently owns, and
counts "ownership" as who gets to decide the programming in a station.

With the technicalities out of the way, let's jump right to the data! The graph below shows how
Sinclair has grown since Julian Sinclair Smith founded the company in 1971:

.. image:: images/Sinclair_Growth.png
  :alt: Whoops, something went wrong when fetching this png image.
  :align: center
  :width: 80%

Nothing too surprising here; we knew that Sinclair Broadcast was a successful group, so we expected
a general upward trend in growth. In my opinion, the really interesting aspect of this graph is how
well it explains the history of Sinclair, with large growth spikes occurring when the company goes
on a buying spree and dips during financial trouble. Look at the following summary and see if you
can spot the effects of major events:

- **1971:** Julian Sinclair Smith establishes the company as the Chesapeake Television Corporation
  with one TV station.
- **1980:** Smith's son David Smith begins taking a more active role in the company.
- **1985:** The company changes its name to the Sinclair Broadcast Group.
- **1990:** David Smith, along with his three brothers, buy their parents' stock and take control of
  the company.
- **1991:** The company pioneers the concept of a local marketing agreement for TV broadcasting 
  (it's been done before in radio broadcasting). This tool later becomes a large part of their
  business strategy.
- **1994:** Sinclair acquires `Act III Broadcasting`_ and its 8 stations.
- **1997:** Sinclair merges with `River City Broadcasting`_, gaining 6 stations.
- **1998:** Sinclair acquires `Guy Gannett Communications`_ and its 6 stations.
- **2007:** The financial crisis hits and Sinclair stops its expansion, actually selling off some
  stations. 
- **2009:** The company almost files for Chapter 11 Bankruptcy in July.
- **2011:** Sinclair seemingly recovers and acquires `Four Points Media Group`_ along with 6 of its
  stations.
- **2012:** Sinclair acquires both `Freedom Communications`_ (7 stations) and `Newport Television`_
  (8 stations).
- **2013:** Sinclair acquires both `Barrington Broadcasting`_ (15 stations) and 
  `Fisher Communications`_ (17 stations).
- **2014:** Sinclair acquires `Allbritton Communications`_ (6 stations).
- **2017:** Sinclair files for acquisition of Tribune Media.

.. _`Act III Broadcasting`:
  https://en.wikipedia.org/wiki/Act_III_Broadcasting
.. _`River City Broadcasting`:
  https://en.wikipedia.org/wiki/River_City_Broadcasting
.. _`Guy Gannett Communications`:
  https://en.wikipedia.org/wiki/Guy_Gannett_Communications
.. _`Four Points Media Group`:
  https://en.wikipedia.org/wiki/Four_Points_Media_Group
.. _`Freedom Communications`:
  https://en.wikipedia.org/wiki/Freedom_Communications
.. _`Newport Television`:
  https://en.wikipedia.org/wiki/Newport_Television
.. _`Barrington Broadcasting`:
  https://en.wikipedia.org/wiki/Barrington_Broadcasting
.. _`Fisher Communications`:
  https://en.wikipedia.org/wiki/Fisher_Communications
.. _`Allbritton Communications`:
  https://en.wikipedia.org/wiki/Allbritton_Communications

The animation below reiterates this history, but gives a more complete view of the company's growth.
We see not only *when* Sinclair made acquisitions, but *where* these new stations were. From this,
we can also track the 40 year long expansion from the Eastern seaboard to the Western one. (Manifest
Destiny, anyone?)

.. image:: images/Sinclair_Stations.gif
  :alt: Whoops, something went wrong when fetching this gif.
  :align: center

A quick note: in the map above, you probably noticed that I've included transmitter power as part of
the data. This number basically corresponds to how large any particular station is. Originally, I
thought that using this information would give me a good idea of how far the programming of each station reaches, knowledge that we'll need in the future, so that we can compare which counties in the US have access to Sinclair programming and which don't. For vairous reasons, this turned out to be a naive assumption [#]_.

So now we hit a roadblock. If transmitter power gave us inaccurate forecasts about which locations
have access to which stations, what else can we try? For our plan to work, we need to know which
locations have access to which stations. Luckily people have already figured this out: TV markets!

Television Has Markets?
-----------------------

Ok, admittedly, this question can go straight into the "well duh" category. Any company worth their
stock price would want to find out which places they should market to and which demographics they
should target; why would TV be any different? And the granddaddy of all research on TV, radio, and
internet? `Nielsen`_.

.. _`Nielsen`: 
  http://www.nielsen.com/us/en.html

Nielsen collects data on media audiences. These include newspapers, television, radio, and films.
If you've ever had a favorite TV show cancelled because of low ratings, you can probably blame the
`Nielsen ratings system`_ which "has been the deciding factor in cancelling or renewing television
shows by television networks for years" [#]_. 

.. _`Nielsen ratings system`: 
  https://www.forbes.com/sites/seamuskirst/2015/12/18/what-are-nielsen-ratings-and-how-are-they-calculated/#1fbd1fa656e0 

Another product the company famously provides: *Designated Market Areas* or DMAs. These areas divide
the United States into jigsaw-like pieces that allow marketers or researchers to organize TV
viewership geographically. Since having a blog automatically qualifies me as a veteran researcher,
I'll be using these marketing regions to quantify all that Sinclair growth we've talked about in
the last few sections.

So here they are, in all their glory; how media moguls (at least the TV ones) see the United States
[#]_:

.. raw:: html

  <div class="d3-visual"></div>

The visualization above holds information about each DMA (just hover over it with your mouse). This
includes the name, the number of homes with TVs, the percentage of homes with cable, the population
as a percentage of the US total, and rank according to Nielsen.

We can combine our previous results about Sinclair stations with this population data to get a
better view of the market share that Sinclair has in the US. The way we do this is by first seeing
where Sinclair has TV stations (we already know this). We then look up which market goes with each
station. Finally we make the assumption that each station can broadcast to it's entire market (as
far as I can tell, this is standard) and count the population.

Voilà! We now know the percentage of the US population that has access to Sincliar programming
[#]_:

.. image:: images/Sinclair_Viewership.png
  :alt: Whoops, something went wrong when fetchin this png.
  :align: center
  :width: 80%

In case you're wondering, the graph peaks at 36.287% in 2014 and is currently at 35.494%. In
addition to this graph, we can once again take a look at which markets Sinclair operates in by using
an animated map.

.. image:: images/Sinclair_DMAs.gif
  :alt: Whoops, something went wrong when fetching this gif.
  :align: center

If the last two graphs about DMAs look similar to the earlier graphs describing stations, it's
because they are. This points to the fact that Sinclair doesn't just buy stations nilly-willy; they
make most purchases in new markets, so as to expand their viewing audience as much as possible. 

It also reflects the fact that the Federal Communications Commission (FCC) actually has rules in
place for regulating television broadcasts. That's right ...

Television Has Rules?
---------------------

Yes, and they're more involved than "Don't shout obscenities during a broadcast". 

You may be interested in learning that the FCC, in addition to licensing broadcast rights to TV 
stations, has a `law prohibiting duopolies`_ within a single market. This rule historically exists
on the premise that owning two (or more) stations in the same region gives too much influence to
one company. This rule also helps explain *some* of the correlation between stations and markets we
saw above; Sinclair usually wants to buy new stations in new markets to avoid fines and lawsuits.

.. _`law prohibiting duopolies`:
  https://www.fcc.gov/consumers/guides/fccs-review-broadcast-ownership-rules

Of course, station owners have long since figured out loopholes in the law through local marketing
agreements, in effect creating virtual duopolies. In addition, in 2002, the FCC voted to 
`allow duopolies`_ under certain criteria, so the rule is not a strong as it initially appears.

.. _`allow duopolies`:
  https://en.wikipedia.org/wiki/Duopoly_(broadcasting)

The FCC also sets a ceiling on the total number of households a single station group (like Sinclair)
broadcasts to. This number? 39% of all US households. With about 35%, it seems Sinclair is set to
soon reach this maximum.

Except they're not, because of something known as the Ultra High Frequency (UHF) Discount. I can go
into this in more detail, but it's not actually necessary for our ultimate goal, just something I
came across in my research. For those interested, `here's a good article`_.

.. _`here's a good article`:
  https://www.bloomberg.com/news/articles/2017-05-07/sinclair-said-close-to-buying-tribune-for-about-45-a-share

Up Next
~~~~~~~

Now that we know *where* and *when* the Sinclair Broadcast Group acquired its holdings, we've
essentially fulfilled step **1** above. Technically, I haven't looked at county data yet, but as
it turns out, the DMAs we talked about align very nicely with county boundaries. We just need to
connect each DMA with the counties it contains.

Up next, we'll look at different measures of political sentiment and political polarization across
all 3000 counties in the USA and attempt to assign similarity ratings to each pair.

====

Resources
~~~~~~~~~

The data and code used in this post can be found in `this GitHub repo`_.

.. _`this GitHub repo`:
  https://github.com/theMimsy/Blog---Sinclair-Broadcast-Group

I created two annotated JUPYTER **R** notebooks describing how I got and created the graphs here:

- `Sinclair Station Exploration <sinclair-station-exploration.html>`_
- `Sinclair DMA Exploration <sinclair-dma-exploration.html>`_

Footnotes
---------

.. [#] You can find the full marketing report for these statistics from `Marketing Charts`_.
.. [#] Here's `the segment`_, for those wanting to see it themselves.
.. [#] Here's a general overview of how the media can affect politcs by the `University of Oregon`_.
.. [#] For those interested, here's a `Washington Post`_ breakdown of how media coverage affected 
  the 2016 presidential election.
.. [#] There exist a few papers that tested this rigorously. The most influential seem to be 
  `Ideological Segregation Online and Offline`_ and `Evidence from Twitter`_.
.. [#] Curiously, a new paper emerged recently that seems to say that social media doesn't account
  for *all* recent polarization, so other culprits might be print news and TV (my speculation).
  Here's an overview from `The New York Times`_.
.. [#] According to the `Wikipedia page on Sinclair stations`_.
.. [#] According to a site called `RabbitEars`_. I only found out about this site after writing the
  majority of this article, but these guys have some serious data on all stations in the US.  They
  have location, tower height, tower power, tower coverage and contour, population served, video
  quality (720i, 480i, etc), and even the exact dielectrics used in the transmitters.
.. [#] So say the `LA Times`_
.. [#] There are many reasons why you wouldn't be able to accurately look at the reach of a station
  using only transmitter power. Geographic features are one reason; broadcasts have a hard time
  going over mountains. Air temperature and quality are another. Then there's the fact that some
  transmitters use beamforming to transmitt signals in particular directions. For example, the TV
  station KCVU in Paradise CA uses most of it's power to transmitt only North (where the majority
  of the population resides):
.. image:: images/KCVU_Power.png
  :alt: Whoops, something went wrong when fetching this image.
  :align: center
  :width: 25%
.. [#] I got the last part of this sentence verbatim from the `Nielsen Wikipedia page`_.
.. [#] I took the bulk of the code here from `Simon Zou's Github page`_. Since his code uses old
  Nielsen data, I first updated it from the newest (2017) rankings on `TVB`_. I then tweaked the
  some aesthetics to make it conform to this blog page.
.. [#] I confess, this chart isn't 100% accurate. I used population percentages from 2017 in *all*
  the years on the chart. This isn't a big deal because most cities stayed roughly where they always
  were (Chicago, for example, was about 3% of the population since the 1970s), but there can be
  discreptencies.

.. _`Marketing Charts`:
  http://www.marketingcharts.com/featured-24817
.. _`the segment`:
  https://www.youtube.com/watch?v=GvtNyOzGogc
.. _`Thinking Fast and Slow`: 
  https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555
.. _`Civil Forfeiture`:
  https://www.youtube.com/watch?v=3kEpZWGgJks
.. _`Marketing to Doctors`:
  https://www.youtube.com/watch?v=YQZ2UeOTO3I
.. _`The State of Journalism`:
  https://www.youtube.com/watch?v=bq2_wSsDwkQ
.. _`Charter Schools`:
  https://www.youtube.com/watch?v=l_htSPGAY7I
.. _`University of Oregon`:
  http://journalism.uoregon.edu/news/six-ways-media-influences-elections/
.. _`Washington Post`:
  https://www.washingtonpost.com/news/monkey-cage/wp/2016/06/24/a-deep-dive-into-the-news-medias-role-in-the-rise-of-donald-j-trump/?utm_term=.17f7bd101845
.. _`Ideological Segregation Online and Offline`:
  http://www.nber.org/papers/w15916
.. _`Evidence from Twitter`:
  http://www.nber.org/papers/w20681
.. _`The New York Times`:
  https://www.nytimes.com/2017/04/13/us/political-polarization-internet.html
.. _`Wikipedia page on Sinclair stations`: 
  https://en.wikipedia.org/wiki/List_of_stations_owned_or_operated_by_Sinclair_Broadcast_Group
.. _`RabbitEars`: 
  http://rabbitears.info/search.php?request=owner_search&owner=Sinclair&sort=state
.. _`LA Times`:
  http://www.latimes.com/business/hollywood/la-fi-ct-tribune-sinclair-20170508-story.html
.. _`Simon Zou's Github page`:
  http://bl.ocks.org/simzou/6459889
.. _`TVB`:
  https://www.tvb.org/Default.aspx?TabID=1579
.. _`Nielsen Wikipedia page`:
  https://en.wikipedia.org/wiki/Nielsen_Media_Research
