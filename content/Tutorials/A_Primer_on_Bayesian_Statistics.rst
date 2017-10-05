:title: A Primer on Bayesian Statistics (Part 1)
:date: 2017-09-15 12:00
:tags: learning, bayes
:category: Tutorials
:slug: a_primer_on_bayesian_statistics_p1
:author: Dawid Minorczyk
:summary: Heard about Bayesian statistics but don't really know what the hubbub is? Start here!
:picture: images/Bayes_Final.svg
:sortorder: 1
:mathcolor:
:styles: bayes_d3.css

.. |br| raw:: html

  <br \>

.. role:: sunny

.. role:: cloudy

.. role:: rainy

.. role:: jog

.. role:: red

.. role:: blue

.. role:: wit

.. note:: 

  **NOTE:** This is the first part in a two part series. You can find the second part `right here <a_primer_on_bayesian_statistics_p2.html>`_.

A Primer on Bayesian Statistics (Part 1)
========================================

Like many people first starting out on their journey into data science, I dove
straight into the cool and shiny stuff long before I really knew what I was doing [#]_. It was
during this exploratory phase, while I oogled those fancy neural
networks, that I began noticing the term
*Bayesian Statistics* with increasing frequency. It popped up in blogs, it popped up in books, it
popped up in online videos. "What are they talking about?" I thought, "That one equation I learned
about in my intro statistics course? What's the big deal here?"

As I soon found out, I was missing out on a whole school of statistics knowledge and I didn't even
know about it! Unfortunately, sources I found on the subject tended to swing either towards textbook-levels of denseness or vague philosophical works about "Dutch Books" [#]_. This is a shame, because I think you *can* explain the concept in some meaningful depth without writing a whole textbook; all you need is a few visuals and insightful examples.

Reviewing Bayes' Theorem With a Few Visuals and Insightful Examples
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Unsurprisingly, I want to start this tutorial by reviewing *Bayes' Theorem*. The math involved in the theorem isn't especially difficult, but I think many people really miss the point when they first see it. I myself remember learning the formula, thinking to myself "oh, that's cool", and then moving on, leaving the knowledge in a dusty corner of my mind. In order to avoid that in this tutorial, I'll try to be thorough, and build up intuition as much as possible. I'll do this by taking a visual approach and deriving *Bayes' Theorem* through an example:
:math:`\require{color}`
:math:`\definecolor{cs}{RGB}{252, 141, 98}`
:math:`\definecolor{cc}{RGB}{102, 194, 165}`
:math:`\definecolor{cr}{RGB}{141, 160, 203}`
:math:`\definecolor{cj}{RGB}{231, 138, 195}`
:math:`\definecolor{ccr}{RGB}{227, 26, 28}`
:math:`\definecolor{ccb}{RGB}{31, 120, 180}`
:math:`\definecolor{ccw}{RGB}{51, 160, 44}`
:math:`\definecolor{def}{RGB}{93, 93, 93}`

Weather and Hobbies
-------------------

As all meteorologists will tell you, there are only three types of weather in the world: :sunny:`sunny`, :cloudy:`cloudy`, and :rainy:`rainy`. Here in California, the weather tends to favor long, dry days. As an approximation, let's say that it's :sunny:`sunny` :math:`\color{cs}{60\%}` of the time, :cloudy:`cloudy` :math:`\color{cc}{30\%}` of the time, and :rainy:`rainy` :math:`\color{cr}{10\%}` of the time. We can represent this situation quite simply with a visualization:

.. image:: images/1d_weather_only.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Now, when I make small talk about the weather, I usually talk about my hobbies as well. I'm a pretty simple guy, so you can segregate my hobbies into two categories: :jog:`running` and everything else. Out of these two groups, I estimate that I go :jog:`running` :math:`\color{cj}{40\%}` of all days:

.. image:: images/1d_running_only.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

That's an intuitive way to represent probabilities, but it doesn't allow us to compare everything directly. It would be great if we could talk about the weather and our hobbies at the same time. Fortunately, we can! Just combine the scales above into a 2D figure:

.. image:: images/2d_independent_plain.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Now we can show off both sets of events, just like we wanted. We can see all of the probabilities and even measure them out if we wanted to:

.. math::

  \begin{array}{rccl}
  \boldsymbol{P}(\color{cs}sunny\color{def}) & = 0.60 & \rightarrow & \, \scriptstyle\text{The size of the sunny area } \img[-0.25em][1em][1em]{images/ss.svg} \text{ when compared to the whole area}. \\
  \boldsymbol{P}(\color{cc}cloudy\color{def}) & = 0.30 & \rightarrow & \, \scriptstyle\text{The size of the cloudy area } \img[-0.25em][1em][1em]{images/sc.svg} \text{ when compared to the whole area}. \\
  \boldsymbol{P}(\color{cr}rainy\color{def}) & = 0.10 & \rightarrow & \, \scriptstyle\text{The size of the rainy area } \img[-0.25em][1em][1em]{images/sr.svg} \text{ when compared to the whole area}. \\
  \boldsymbol{P}(\color{cj}running\color{def}) & = 0.40 & \rightarrow & \, \scriptstyle\text{The size of the running area } \img[-0.25em][1em][1em]{images/sj.svg} \text{ when compared to the whole area}.
  \end{array}

Conditional Probability
-----------------------

Hmmm, something seems off. You see, I actually don't like running when it's too hot outside. While my overall rate is :math:`\color{cj}{40\%}`, I tend to run *less* than that if I think I might die of dehydration. Conversely, I also tend to run a lot *more* on cool, rainy days. The diagram above doesn't show that. See all those right angles? Those are right angles of *independence*! They imply that, no matter what kind of weather I'm currently experiencing, I will always have a :math:`\color{cj}40\%` running rate. Me :jog:`running` and the weather don't affect one another.

We can visually prove this by looking at the *conditional probabilities* of each event. For example, say it's a :sunny:`sunny` day and we want to know the probability of me going for a :jog:`jog`. In mathematical notation, we're looking for the quantity :math:`\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def})`. We can find it like this:

.. image:: images/2d_conditional_sunny.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

This image shows how I like to think about *conditional probability*. When we assumed that it was a :sunny:`sunny` day, we essentially said that we must land in the :math:`\img[-0.25em][1em][1em]{images/ss.svg}` area (*you are here*). To see how likely it is that I go :jog:`running` in :sunny:`sunny` weather, we then look for how likely it is that we land in the :math:`\img[-0.25em][1em][1em]{images/sj.svg}` area, knowing that we have to stay in the :math:`\img[-0.25em][1em][1em]{images/ss.svg}` area. Thus, the probability of me :jog:`running` given that it's :sunny:`sunny`, :math:`\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def})`, is the area of the intersection :math:`\img[-0.25em][1em][1em]{images/sjs.svg}` compared to the :math:`\img[-0.25em][1em][1em]{images/ss.svg}` area. Notice that this is still :math:`40\%`! Thus, :math:`\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def}) = \boldsymbol{P}(\color{cj}running\color{def})` and we have *independence*.

We can go a step further, take what I said above, and make it concrete with a formula:

.. math::

  \begin{array}{crcc}
  & \boldsymbol{P}(\color{cj}running\color{def}) & \rightarrow & \img[-0.25em][1em][1em]{images/sj.svg} \\
  & \boldsymbol{P}(\color{cs}sunny\color{def}) & \rightarrow & \img[-0.25em][1em][1em]{images/ss.svg} \\
  & \boldsymbol{P}(\color{cj}running\color{def},\,\color{cs}sunny\color{def}) & \rightarrow & \img[-0.25em][1em][1em]{images/sjs.svg} \\
  & \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def}) & \rightarrow & \dfrac{\img[-0.25em][1em][1em]{images/sjs.svg}}{\img[-0.25em][1em][1em]{images/ss.svg}}
  \end{array}
  \Large\Rightarrow\normalsize
  \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def}) = \dfrac{\boldsymbol{P}(\color{cj}running\color{def},\,\color{cs}sunny\color{def})}{\boldsymbol{P}(\color{cs}sunny\color{def})}

To anyone who's taken a statistics course, this is the all-too-familiar formula for *conditional probability*, derived using a purely visual method! It's usually presented with arbitrary events :math:`A` and :math:`B` in a somewhat bland way:

.. math::

  \boldsymbol{P}(A|B) \boldsymbol{P}(B) = \boldsymbol{P}(A,B) = \boldsymbol{P}(B|A) \boldsymbol{P}(A)

Now that we've established *independence* between :jog:`running` and all the weather events, how can we go about changing that? Well, we just have to get rid of the right angles:

.. image:: images/2d_fixed_plain.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Look at how the probability of :jog:`running` shifted away from :sunny:`sunny` towards :cloudy:`cloudy` and :rainy:`rainy` (the dotted line is the old boundary). The events now work out in a way that reflects my preferences:

.. math::

  \begin{array}{rccl}
  \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def}) & = 0.32 & < 0.40\\
  \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cc}cloudy\color{def}) & = 0.50 & > 0.40\\
  \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def}) & = 0.58 & > 0.40\\
  \end{array}

Bayes' Theorem
--------------

Bad luck, it seems you've suddenly developed an acute case of *can't-tell-the-weather-itus*. It's an extremely rare disease that temporarily removes your ability to detect the weather (strangely, it doesn't affect your life in any other way). Just as this happens, you spot me :jog:`jogging` across the street. Aha! A way out of this predicament! You've read this post, so you know that I'm more likely to be :jog:`running` if it's :rainy:`raining` or :cloudy:`cloudy`. The chances of :rainy:`rainy` or :cloudy:`cloudy` weather must be high! 

No wait, that's wrong. You only know how the weather affects my tendency to run, not the other way around. In other words, you might know :math:`\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def})` but you do not know :math:`\boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def})`, and these two values are *not* necessarily equal. Visually:

.. image:: images/2d_bayes_rain.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

If we're looking for :math:`\boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def})`, we want to know how likely it is that we land in :math:`\img[-0.25em][1em][1em]{images/sr.svg}` assuming we're already in :math:`\img[-0.25em][1em][1em]{images/sj.svg}`; just looking at the diagram, you can surmise that this is a small number, especially when compared to :math:`\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def}) = 0.58` (how likely we are to land in :math:`\img[-0.25em][1em][1em]{images/sj.svg}` assuming we're inside :math:`\img[-0.25em][1em][1em]{images/sr.svg}`). The discrepancy stems from that fact that, in California, the base rate of :rainy:`rain` starts low, :math:`\boldsymbol{P}(\color{cr}rainy\color{def}) = 0.10`. If you want to get the correct prediction, you have to approach this from a different angle.

Good thing we learned about *conditional probability* in the last section! Just like last time, we can find :math:`\boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def})` as follows:

.. math::

  \begin{array}{crcc}
  & \boldsymbol{P}(\color{cr}rainy\color{def}) & \rightarrow & \img[-0.25em][1em][1em]{images/sr.svg} \\
  & \boldsymbol{P}(\color{cj}running\color{def}) & \rightarrow & \img[-0.25em][1em][1em]{images/sj.svg} \\
  & \boldsymbol{P}(\color{cr}rainy\color{def},\,\color{cj}running\color{def}) & \rightarrow & \img[-0.25em][1em][1em]{images/sjr.svg} \\
  & \boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def}) & \rightarrow & \dfrac{\img[-0.25em][1em][1em]{images/sjr.svg}}{\img[-0.25em][1em][1em]{images/sj.svg}}
  \end{array}
  \Large\Rightarrow\normalsize
  \boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def}) = \dfrac{\boldsymbol{P}(\color{cr}rainy\color{def},\,\color{cj}running\color{def})}{\boldsymbol{P}(\color{cj}running\color{def})}

The only problem here is that we don't know the numerical value of the :math:`\img[-0.25em][1em][1em]{images/sjr.svg}` area, the intersection :math:`\boldsymbol{P}(\color{cr}rainy\color{def},\,\color{cj}running\color{def})`. We can fix this by applying *conditional probability* in the other direction, basically switching the roles of :jog:`running` and :rainy:`rainy`:

.. math::

  & \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def}) = \dfrac{\boldsymbol{P}(\color{cr}rainy\color{def},\,\color{cj}running\color{def})}{\boldsymbol{P}(\color{cr}rainy\color{def})} \\
  \Large\Rightarrow\normalsize
  & \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def}) \boldsymbol{P}(\color{cr}rainy\color{def}) = \boldsymbol{P}(\color{cr}rainy\color{def},\,\color{cj}running\color{def})

Finally, we substitute and get our answer:

.. math::

  \boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def}) = \dfrac{\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def}) \boldsymbol{P}(\color{cr}rainy\color{def})}{\boldsymbol{P}(\color{cj}running\color{def})}

Or, in case you prefer to do all your math using colorful squares [#]_:

.. math::

  \dfrac{\img[-0.25em][1em][1em]{images/sjr.svg}}{\img[-0.25em][1em][1em]{images/sj.svg}} = \dfrac{\img[-0.25em][1em][1em]{images/sjr.svg}}{\img[-0.25em][1em][1em]{images/sr.svg}} \cdot \dfrac{\img[-0.25em][1em][1em]{images/sr.svg}}{\img[-0.25em][1em][1em]{images/sj.svg}}

This formula is known as *Bayes' Theorem*. The most immediate result of *Bayes' Theorem* is that it allows you to flip *conditional probabilities*:

.. math::

  \boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def})
  \leftrightarrow
  \boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def})

In our case, for example, it allows us to solve the big problem you were having just a little while ago:

.. math::

  \boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def}) = & \dfrac{\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def}) \boldsymbol{P}(\color{cr}rainy\color{def})}{\boldsymbol{P}(\color{cj}running\color{def})} \\
  = & \dfrac{0.58 \cdot 0.10}{0.40} = 0.145

Similarly, we can use this method to find the other probabilities as well:

.. math::

  & \boldsymbol{P}(\color{cc}cloudy\color{def}\,|\,\color{cj}running\color{def}) = \dfrac{\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cc}cloudy\color{def}) \boldsymbol{P}(\color{cc}cloudy\color{def})}{\boldsymbol{P}(\color{cj}running\color{def})} = 
  0.375 \\
  & \boldsymbol{P}(\color{cs}sunny\color{def}\,|\,\color{cj}running\color{def}) = \dfrac{\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def}) \boldsymbol{P}(\color{cs}sunny\color{def})}{\boldsymbol{P}(\color{cj}running\color{def})} = 
  0.48

Predicament solved! Even though I prefer :rainy:`rain` to :sunny:`sun` when :jog:`jogging`, the fact that California has mostly :sunny:`sunny` weather beats out my preferences. If you see me out for a :jog:`jog`, I'm probably dehydrated (I should start working out with a water bottle).

A Different Way to Think About Bayes
------------------------------------

The ability to switch *conditional probabilities* sounds useful, but how can you create a whole school of thought based around it? How can people write whole textbooks on the subject? How come this tutorial is only half over? Well, the real power of *Bayes' Theorem* doesn't lie in it's ability to switch *conditional probabilities*, and I wouldn't want you to come away from this tutorial thinking that. Instead, statisticians view *Bayes' Theorem* like so:

.. image:: images/Bayes_Theorem_Explained.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

This view of *Bayes' Theorem* says you can combine the base rate of an event (the *prior*) and modify it with new information to get a better estimate of the same event (the *posterior*). In the picture above, you start with base knowledge about the probability of :rainy:`rain`. If you don't have any other information, you can only rely on the this base rate, so :math:`\boldsymbol{P}(\color{cr}rainy\color{def}) = 0.10`. However, once you get a piece of data (whether I'm :jog:`running` that day or not), *Bayes' Theorem* says that you integrate this information into a new estimate and get a *posterior* probability. In this case, you find that :math:`\boldsymbol{P}(\color{cr}rainy\color{def}\,|\,\color{cj}running\color{def}) = 0.145`.

The modifying term compares the likelihood of me :jog:`running` in :rainy:`rainy` weather (the numerator) to the flat chance of me :jog:`running` in any weather (the denominator). These two terms have names, the *likelihood* and the *evidence* [#]_:

.. image:: images/Bayes_Theorem_Full.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

In effect, the *likelihood* and the *evidence* measure how much information we get out of the data. If the modifier ends up greater than :math:`1`, our *posterior* probability ends up higher than our *prior*. The same is true in the other direction; if the modifier is less than :math:`1`, the *posterior* probability will be lower than the *prior*. For example:

.. math::

  \dfrac{\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cr}rainy\color{def})}{\boldsymbol{P}(\color{cj}running\color{def})}
  = \dfrac{0.58}{0.40} > 1
  \Large\Rightarrow\normalsize
  \text{posterior} \, > \, \text{prior}

.. math::

  \dfrac{\boldsymbol{P}(\color{cj}running\color{def}\,|\,\color{cs}sunny\color{def})}{\boldsymbol{P}(\color{cj}running\color{def})}
  = \dfrac{0.32}{0.40} < 1
  \Large\Rightarrow\normalsize
  \text{posterior} \, < \, \text{prior}

Since you know that I prefer :rainy:`rainy` weather when working out, your estimate of :rainy:`rain` goes up from the base rate if you see me :jog:`running`. Similarly, your estimate on the chances of :sunny:`sunny` weather go down. Why is this so useful? Because now, we have a way to incorporate data into initial estimates and refine them! Isn't that exciting!

What's that? You still don't see what the big deal is? Maybe we need another example.

A New Example and a Change of Colors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To appreciate the power of incorporating data into estimates, let's change gears and work through a new, more serious, example. 

Consider a city with two competing cab companies: the :red:`red` and :blue:`blue` company. The :red:`red` company dominates the market with :math:`\color{ccr}75\%` of cabs in the city, leaving :math:`\color{ccb}25\%` to the :blue:`blue` company. One day, a hit-and-run occurs. Local camera footage manages to see that a cab driver was the perpetrator. Unfortunately, the camera did not catch the logo on the cab, the only distinguishing feature between the two companies. Because of your vast statistics knowledge, you've been chosen to act as a judge on this case. Which company do you believe should be fined [#]_? Most likely, guilt lies with the :red:`red` company, simply due to chance:

.. image:: images/cabs_1.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

This sets up our *prior*. Right now, we only know the following:

.. math::
  \begin{array}{rccl}
  \boldsymbol{P}(\color{ccb}blue\color{def}) & = 0.25 & \rightarrow & \, \scriptstyle\text{The probability that the cab belonged to the blue company.} \\
  \boldsymbol{P}(\color{ccr}red\color{def}) & = 0.75 & \rightarrow & \, \scriptstyle\text{The probability that the cab belonged to the red company.}
  \end{array}

Of course, the story doesn't end there. Not wanting to pay hefty fees, the :red:`red` company produces a :wit:`witness` that says he saw the :blue:`blue` company logo. You check the camera footage and notice that this :wit:`witness` was indeed nearby when the crime happened. The :blue:`blue` company, aware that eyewitnesses can be unreliable, proposes a test to see if the :wit:`witness` can correctly differentiate company logos when a cab drives past him. The :wit:`witness` takes the test and, much to the :red:`red` companies' chagrin, it's found he can only identify the correct logo :math:`\color{ccw}60\%` of the time. 

Ok judge, which company do you suspect now? Well, let's look at the data we just got:

.. math:: 
  \begin{array}{rccl}
  \boldsymbol{P}(\color{ccw}witness \color{def} \text{ says } \color{ccb}blue \color{def}\,|\,\color{ccb}blue\color{def}) & = 0.60 & \rightarrow & \, \scriptstyle\text{The witness is correct.} \\
  \boldsymbol{P}(\color{ccw}witness \color{def} \text{ says } \color{ccb}blue \color{def}\,|\,\color{ccr}red\color{def}) & = 0.40 & \rightarrow & \, \scriptstyle\text{The witness is incorrect.}
  \end{array}

The testimony represents a single data point that we can use to modify the base rate of either :math:`\boldsymbol{P}(\color{ccb}blue\color{def})` or :math:`\boldsymbol{P}(\color{ccr}red\color{def})`. Looking at the probability space can give us some good intuition about the case:

.. image:: images/cabs_2.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Since the :wit:`witness` testified against the :blue:`blue` company, we know we're in the striped region. Just looking at the picture, the :red:`red` company remains the most likely suspect: the area of the lower-right striped region (culprit was :red:`red` and the :wit:`witness` is wrong) looks larger than the upper-left striped region (culprit was :blue:`blue` and :wit:`witness` is right).

Of course, we need to test this out rigorously. Let's try to find the *posterior* probability for :blue:`blue` (we could have also chosen to calculate the *posterior* for :red:`red`, I just made a random choice). To find :math:`\boldsymbol{P}(\color{ccb}blue\color{def} \,|\, \color{ccw}witness\color{def} \text{ says } \color{ccb}blue\color{def})` we use *Bayes' Theorem*:

.. math::
  \begin{array}{rcl}
  posterior & = & \dfrac{likelihood}{evidence} \cdot prior \\
  \boldsymbol{P}(\color{ccb}blue\color{def} \,|\, \color{ccw}witness\color{def} \text{ says } \color{ccb}blue\color{def}) & = & \dfrac{\boldsymbol{P}(\color{ccw}witness\color{def} \text{ says } \color{ccb}blue\color{def} \,|\, \color{ccb}blue\color{def})}{\boldsymbol{P}(\color{ccw}witness\color{def} \text{ says } \color{ccb}blue\color{def})} \cdot \boldsymbol{P}(\color{ccb}blue\color{def})
  \end{array}

The only term that we don't immediately know here is the *evidence*, the probability that the :wit:`witness` says :blue:`blue`. However, we can easily figure this out, we just need to consider all the situations that can lead to the :wit:`witness` saying :blue:`blue`. There are two, each represented by one of the striped regions in the probability space: 

.. image:: images/cabs_3.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

We arrive at a pretty expected answer:

.. math::
  \boldsymbol{P}(\color{ccb}blue\color{def} \,|\, \color{ccw}witness\color{def} \text{ says } \color{ccb}blue\color{def}) = \dfrac{(0.60)(0.25)}{(0.60)(0.25) + (0.40)(0.75)} = 0.333

So, even with the testimony, we find that most guilt still lies with the :red:`red` company. The chances of the culprit being :blue:`blue` are only :math:`1` in :math:`3`.

But wait, just as you're about to pass your judgment, someone bursts into the courtroom [#]_. It's a second :wit:`witness`, who also says he saw a :blue:`blue` logo. And behind him? There's a third :wit:`witness`, and a fourth, and a fifth, ...

Each :wit:`witness` has their own story, ready to supply evidence for either the :red:`red` or :blue:`blue` company. They all took the test and each of them also got a :math:`\color{ccw}60\%` (really blurry logos) [#]_. If running out of the courtroom while screaming is not an option, how can you handle this situation? Will *Bayes' Theorem* stop working now that we have multiple data points? Of course not! For example, if we have two :wit:`witnesses` and both say they saw :blue:`blue`, we could calculate:

.. math::
  \begin{array}{rcl}
  posterior & = & \dfrac{likelihood}{evidence} \cdot prior \\
  \boldsymbol{P}(\color{ccb}b\color{def} \,|\, \color{ccw}w_1\color{def} \text{ says } \color{ccb}b\color{def}, \color{ccw}w_2\color{def} \text{ says } \color{ccb}b\color{def}) & = & \dfrac{\boldsymbol{P}(\color{ccw}w_1\color{def} \text{ says } \color{ccb}b\color{def}, \color{ccw}w_2\color{def} \text{ says } \color{ccb}b\color{def} \,|\, \color{ccb}b\color{def})}{\boldsymbol{P}(\color{ccw}w_1\color{def} \text{ says } \color{ccb}b\color{def}, \color{ccw}w_2\color{def} \text{ says } \color{ccb}b\color{def})} \cdot \boldsymbol{P}(\color{ccb}b\color{def})
  \end{array}

Here, I used a shorthand :math:`\color{ccb}blue\color{def} \leftrightarrow \color{ccb}b\color{def}` and :math:`\color{ccw}witness\color{def} \leftrightarrow \color{ccw}w\color{def}` to save space. So clearly, *Bayes' Theorem* can handle any amount of data, we simply treat the two (or potentially more) data points as one event. To make this even more clear, we can rewrite our data :math:`(\color{ccw}w_1\color{def} \text{ says } \color{ccb}b\color{def}, \color{ccw}w_2\color{def} \text{ says } \color{ccb}b\color{def})` as an ambiguous :math:`\color{ccw}d\color{def}`:

.. math::
  \begin{array}{rcl}
  \boldsymbol{P}(\color{ccb}b\color{def} \,|\, \color{ccw}d\color{def}) & = & \dfrac{\boldsymbol{P}(\color{ccw}d\color{def} \,|\, \color{ccb}b\color{def})}{\boldsymbol{P}(\color{ccw}d\color{def})} \cdot \boldsymbol{P}(\color{ccb}b\color{def})
  \end{array}

Unfortunately, I won't be able to draw probability spaces (like the ones I drew above) to explain the actual calculations that go on here. This stems from the fact that, to keep each data point *independent*, we would need to move from 2D into 3D, 4D, 5D, etc. We can, however, demonstrate the power of this approach by generating actual samples. Take a look at the following graph, which shows the outcome of using *Bayes' Theorem* with a *LOT* of :wit:`witnesses`:

.. image:: images/Bayes_Multi.png
  :alt: Whoops, something went wrong when fetching this png.
  :align: center

I randomly generated the :blue:`blue` line above by assuming that :blue:`blue` was the real culprit. This would mean that :math:`60\%` of the :wit:`witnesses` would testify against :blue:`blue`, so that if we have :math:`10` of them, :math:`6` (on average) would say they saw a :blue:`blue` logo. I randomly generated the :red:`red` line by assuming the opposite: the :red:`red` company was the culprit. This means that :math:`60\%` of the :wit:`witnesses` testified against the :red:`red` company. The y-axis represents our *posterior* in every case. 

Looking at the graph, it seems that within :math:`\color{ccw}20` :wit:`witnesses`, we had about :math:`99\%` confidence we knew the true culprit. This number would have been lower if each :wit:`witness` could identify the logos at a better rate than :math:`\color{ccw}60\%` [#]_. 

Notice also, that our data eventually overrode the *prior*. Even though we initially believed that :red:`red` was the culprit in both cases (the *prior*), we always end up believing in the correct outcome once we got enough information. This is an important aspect of the *Bayesian* approach that I hope to flesh out later: *priors* can skew *posteriors* when we have low amounts of data, but the *posterior* always converges to the same answer.

Moving Onto the Harder Stuff
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you care about using data to try and tease out answers, hopefully you see how fundamental *Bayes' Theorem* is. You can take initially available information, encode it in a *prior*, and modify it through data. But how is this different than what statisticians have been doing for decades using classical estimators and p-values? And what if we don't know what *prior* to pick? Are we out of luck?

Discovering the connections between *Bayes* and the *Frequentist* (classical) approach and developing those consequences takes a bit more mathematical know-how than what I've used so far. If you're curious and feel up to the task, read on to `Part 2 <a_primer_on_bayesian_statistics_p2.html>`_.

Resources
~~~~~~~~~

Textbooks
---------

The credit for a lot of the examples in this post doesn't belong to me. I took several examples on this page from two sources:

1. David MacKay's book *Information Theory, Inference, and Learning Algorithms*. Both the textbook
   and the lectures associated with them are free and available online with a simple search. Links
   for the lazy: `book`_ and `lectures`_.
2. Andrew Gelman's book *Bayesian Data Analysis*. Not only is this `text`_ well written, it also contains great one-lines like [#]_:

   - "As you know from teaching introductory statistics, 30 is infinity."
   - "Why is it Normal? Because that’s the only continuous multivariate distribution we have. Oh, we have the multivariate :math:`t` ... as if that’s a different distribution.” 

.. _`book`:
  http://www.inference.org.uk/itprnn/book.pdf

.. _`lectures`: 
  http://videolectures.net/david_mackay/

.. _`text`:
  https://www.amazon.com/gp/product/1439840954/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1439840954&linkCode=as2&tag=andrsblog0f-20&linkId=YPLI6GJ24RK74BHN

Footnotes
---------

.. [#] Disclaimer: I still don't. I'm active learning about this topic as I write. Please don't hesitate to tell me about anything that seems wrong.
.. [#] Not that there's anything wrong with textbooks of philosophical works. If you're looking for the former, check out the two books I mention right above these footnotes. If you're looking for the latter, try some `Bayesian Epistemology`_.
.. [#] I don't know about you, but I was personally surprised by this version of *Bayes' Theorem*. You're just canceling out areas!
.. [#] Yes, this is the exact same *likelihood* function that you use when constructing a *maximum likelihood estimate* (MLE). In fact, *Bayes* essentially becomes *maximum likelihood* under certain conditions! Here's a good `Stack Overflow`_ post about it.
.. [#] If this were a real case, the legal system would obviously not work like this. This is just an example.
.. [#] Again, not how real courtrooms work. Pretend this is a TV drama.
.. [#] What I'm doing here is setting up a set of independent and identically distributed samples; the bread and butter of pretty much all statistical inference.
.. [#] Luckily, it wasn't :math:`50\%`! I leave it as an exercise for you to imagine what would happen in that case. Hint, do the calculation for one data point assuming a :math:`50\%` reliable witness.
.. [#] For more great statistics lines (and you know you want more) see this `page of 77 best Gelman quotes`_.

.. _`Stack Overflow`:
  https://stats.stackexchange.com/questions/74082/what-is-the-difference-in-bayesian-estimate-and-maximum-likelihood-estimate
.. _`page of 77 best Gelman quotes`:
  http://www.stat.columbia.edu/~gelman/book/gelman_quotes.pdf
.. _`Bayesian Epistemology`:
  https://plato.stanford.edu/entries/epistemology-bayesian/