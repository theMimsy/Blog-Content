:title: A Primer on Bayesian Statistics (Part 2)
:date: 2017-09-30 12:00
:tags: learning, bayes
:category: Tutorials
:slug: a_primer_on_bayesian_statistics_p2
:author: Dawid Minorczyk
:summary: The second in a two part series about Bayesian Statistics
:picture: images/Bayes_Final.svg
:sortorder: 0
:d3_v4:
:mathcolor:
:scripts: math.min.js, bayes_uniform_d3.js, bayes_beta_d3.js
:styles: bayes_d3.css

.. |br| raw:: html

  <br \>

.. |cardStart| raw:: html

  <div class="card">
    <p class="notation">

.. |cardEnd| raw:: html

    </p>
  </div>

.. role:: blue

.. role:: red

.. role:: green

.. role:: orange

.. note:: 

  **NOTE:** This is the second part in a two part series. You can find the first part `right here <a_primer_on_bayesian_statistics_p1.html>`_.

A Primer on Bayesian Statistics (Part 2)
========================================

Last time, we explained the basics surrounding Bayesian Statistics and its use in data science. We covered *Bayes' Theorem*, *priors*, *posteriors*, and how we can use these tools to refine estimates. While this knowledge opens up a lot of doors, I left a few big questions unanswered:

- I never mentioned how one might use *Bayes' Theorem* in conjunction with popular distributions; in fact, I didn't even define a single random variable! The Frequentist method has standard tools based (mostly) around the normal distribution, such as confidence intervals and p-values. What tools do we have for Bayesian analysis?
- Why would you want to use Bayesian statistics as opposed to classical methods in the first place? What advantages does it bring? Are there any disadvantages?

To answer these questions, I'll need to bring out a bit more mathematical machinery from this point on. As such, Part 2 will be harder (but also more interesting!) than the first part. Glance at the **Notation** card below to get an idea of what I'll be using; see if everything makes sense. A word of warning: I'll be making *heavy* use of the binomial distribution over the next few sections; I definitely recommend brushing up on it!

|cardStart|

Notation
~~~~~~~~

To try to keep things organized and clear, I'll use verbose and self-explanatory notation throughout the post:

- Uppercase letters like :math:`X`, :math:`N_b`, or :math:`U` will represent *random variables* only.
- I'll use lowercase letters like :math:`x`, :math:`n_b`, or :math:`u` to represent *constant parameters* or *specific values of random variables*.
- As before, the symbol :math:`\boldsymbol{P}` will represent the standard probability function.
- The symbol :math:`\partial \boldsymbol{P}` will represent continuous probability distributions. This is nonstandard notation, read on for an explanation.

Why :math:`\partial \boldsymbol{P}`?
------------------------------------

The final piece of notation will probably be unfamiliar. When reading statistics textbooks, most authors tend to use a single function (usually a lower case :math:`\boldsymbol{p}`) to describe distributions of random variables:

- If :math:`X` is *any* random variable (either discrete or continuous) with density function :math:`f`, then :math:`f(x) \leftrightarrow \boldsymbol{p}(X = x)`.

In fact, they usually don't mention :math:`X` at all and just write :math:`\boldsymbol{p}(x)`! This saves space and allows authors to sweep unneeded details under a rug. I want to be as clear as possible in this post, so I'll want to differentiate between discrete and continuous random variables. I'll write:

- If :math:`X` is a discrete random variable with density function :math:`f_X`, then :math:`f_X(x) \leftrightarrow \boldsymbol{P}(X = x)`.
- If :math:`Y` is a continuous random variable with density function :math:`f_Y`, then :math:`f_Y(y) \leftrightarrow \partial \boldsymbol{P}(Y = y)`.

If you feel uncomfortable with having a partial (:math:`\partial`) in front of the probability function (:math:`\boldsymbol{P}`), rest assured there's a good reason for it! [#]_

Hopefully, all of this housekeeping made sense. Let's move on to the actual material.

Example
-------

Let's see this notation in action by reading through a classic card problem.

Say we're playing cards with a standard :math:`52`-card deck. You draw :math:`n = 5` cards and you want to figure out the probability of getting :math:`0` to :math:`4` aces. We can let :math:`N_a` be a random variable representing the number of aces in your hand. In this case, we're looking for :math:`\boldsymbol{P}(N_a = x)` for :math:`x \in \{0, 1, 2, 3, 4 \}`.

Here, I set :math:`n` as a simple constant that does not change, :math:`N_a` as a random variable, and :math:`x` as a specific value for the random variable :math:`N_a`.

Although it's pretty standard, I will *not* use the notation :math:`\boldsymbol{P}(X)` or :math:`\boldsymbol{P}(x)` as shorthand for :math:`\boldsymbol{P}(X = x)`. I do this to separate the notion of a random variable :math:`X` and the notion of an event :math:`X = x`.

|cardEnd|

I Want to Get Into Modeling
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When we make predictions using the Bayesian approach, how do they differ from predictions made using the Frequentist approach? To answer this, I'll first go on a bit of a tangent about statistical modeling. This won't take long, and understanding the anatomy of statistical models is useful in and of itself. By the end of this section, we'll use our newfound knowledge pinpoint the exact locations where the two competing approaches diverge.

What Do Models Look Like?
-------------------------

In theory, modeling is a simple concept to understand; in practice it can be very tricky to implement. The simplest description of modeling is that it allows us to compartmentalize and organize probability spaces. For example, consider tossing a coin :math:`n = 4` times and counting the number of heads. The probability space for all possible outcomes looks like this (assuming a fair coin):

.. image:: images/4_toss_1.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

It would be a pain to have to refer to each event in the probability space individually, even in this simplistic example. Imagine doing this in something like image recognition, where we might not even know what the probability space looks like! This is where models come in. As you probably already know, we usually model counting heads in coin tosses with a single random variable, which I'll call :math:`N_h` (number of heads). This random variable partitions the probability space and allows us to talk about groups of events using the :math:`N_h = x` notation. For example, if we want to talk about getting :math:`1` or :math:`2` heads, we can say :math:`N_h = 1` or :math:`N_h = 2` instead of listing all the events ourselves:

.. image:: images/4_toss_2.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

To complete our model, we assign probabilities to each of our new compound events. Since coin tossing is such an elementary example, we already have a ready-made answer for this. We say that :math:`N_h` has a binomial distribution:

.. math::
  N_h \sim \mathit{Binomial}(n, p) \implies \boldsymbol{P}(N_h = x) = 
  \binom{n}{x} \cdot p^x (1 - p)^{n - x}

Let's try to formalize what we just did. We started with a natural phenomena along with some underlying probability space. This phenomena took in some inputs (:math:`x`) and spat out some outputs (:math:`y`). Visually:

.. image:: images/Model_1.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

In our coin tossing case, we can view the input as the number of tosses we perform (:math:`n`) and the output as the number of heads we count (:math:`N_h`):

.. image:: images/Model_Coin_1.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

I should point out that this diagram is a bit misleading. Most natural phenomena are not fully deterministic [#]_, events usually involve some chance (especially when tossing a coin!). As such, we might not always get the same :math:`y` for the same :math:`x`, like the diagram might imply. I'll get back to this soon, but just keep it in the back of your head for now.

After identifying the ins and outs of a phenomena, we start to build the model. We construct it by attempting to parameterize the probability space. In layman's terms, we build a mathematical formula with some knobs and levers (called parameters). We turn the knobs and pulls the levers (vary the parameters) to try to get the model to look as close as possible to our phenomena:

.. image:: images/Model_2.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

In the picture above, we tweak the model by varying the  :math:`\theta` terms, the parameters I spoke about. These quantities affect how the model makes it's predictions :math:`\hat{y}`. Of course, we want these predictions to approximate :math:`y` as closely as possible. 

What does :math:`\hat{y}` look like? Most of the time, :math:`\hat{y}` looks like :math:`y`. I don't mean that :math:`\hat{y}` equals :math:`y` (that would be quite an impressive model!). What I mean is, the two span the same range of values. If :math:`y \in \{1, 2, ... , 10\}`, then :math:`\hat{y} \in \{1, 2, ... , 10\}`. If :math:`y` is a vector with :math:`3` values, then :math:`\hat{y}` is also a vector with :math:`3` values.

If :math:`\hat{y}` looks like :math:`y` most of the time, when does it not? Well, if we have a lot of uncertainty in our model, we might opt to output a set of answers, each with a probability attached, instead of a single value. For example, in our coin tossing case, the simplest :math:`\hat{y}` we could output is a prediction for the number of heads. However, since our model involves a lot of uncertainty (by design), it would be safer to report a list all of the possibilities and attach probabilities to them. In other words, we output a distribution:

.. image:: images/Model_Coin_2.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

To summarize, instead of saying:

  "With :math:`n = 4` flips, we expect :math:`\hat{y} = 2` heads"

For our model, we say:

  "With :math:`n = 4` flips, there could be anywhere between :math:`0` and :math:`4` heads with such and such probabilities".

These two views of :math:`\hat{y}` (single value vs. a distributions) are usually only semantic differences. If your model outputs a distribution and you're forced to pick a single value, you can always pick the most likely value (the one with the highest probability).

Congratulations! Now we know how models look like in general. It might seem simple, just a few boxes and arrows, but this picture is a very good way to get a handle on even the most complicated cases. 

For example, say you want to predict the price of a home. If you want to be accurate (and of course you do) you will probably use hundreds of variables, each representing a feature of the house, such as square footage and zip code. After exploring all the data, you might decide that this problems is complex enough to warrant the use of something like a neural network. Can we imagine what this model will look like? Yes!

.. image:: images/Model_NN.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

In this case, our input :math:`x`, our parameters :math:`\theta`, and our output :math:`\hat{y}` all grew in complexity. :math:`x` turned into a vector, our parameters into matrices, and our output into the network network function :math:`nn(x)`. Through all of this, notice that our two box structure remained the same!

What Do Models Do?
------------------

At this point, it should be pretty clear that models are a powerful tool [#]_. Anytime we want to describe or predict a phenomena using statistics, we always model the problem first. We can construct models that are quite simple (for example, models you see in introductory statistics classes and blogs), or quite complex (for example, `hierarchical models`_ or `RNNs`_).

.. _`hierarchical models`:
  http://twiecki.github.io/blog/2017/02/08/bayesian-hierchical-non-centered/

.. _`RNNs`:
  http://www.wildml.com/2015/09/recurrent-neural-networks-tutorial-part-1-introduction-to-rnns/

So, what exactly do we get out of model besides boxes? Two things:

1. When we model a phenomena, we can use that model to make predictions about future outcomes. This means we can predict where a hurricane will hit, how a disease will spread, or how many ads to show you so that you buy that expensive new laptop.
2. A model allows us to make sense of past observations. That is, if we have a model for a situation where we don't exactly know what is going on (our model is not perfect), we can use data to try and refine our model and learn more about the underlying situation.

To put it another way, we either want to our model to generate new data (**1**), or we want to use data gathered about some phenomena to adjust our model (**2**). David McKay [#]_ calls these two ideas *forward probability* and *reverse probability*.

Using this vocabulary, we can now locate where Bayesian and Frequentist methods differ! Both do *forward probability* in the same way; it's *reverse probability* where the two schools begin to diverge. The best way to show this is through examples:
:math:`\require{color}`
:math:`\definecolor{cco}{RGB}{252, 141, 98}`
:math:`\definecolor{ccr}{RGB}{227, 26, 28}`
:math:`\definecolor{ccb}{RGB}{31, 120, 180}`
:math:`\definecolor{ccg}{RGB}{51, 160, 44}`
:math:`\definecolor{def}{RGB}{93, 93, 93}`

Forward Probability Example
---------------------------

An urn contains :math:`k` marbles, of which :math:`b` are black and :math:`w = k - b` are white. Fred draws a marble at random, notes its color, and puts it back in the urn. He does this :math:`n` times. What is the probability distribution of the number of black marbles drawn, :math:`N_b`?

You might see this type of problem in any standard textbook on probability theory. In fact, I took it straight out of one! Here, we are given all of the necessary information to fully model the situation. It ends up being just another incarnation of the binomial distribution, with a modified value of :math:`p`:

.. image:: images/Model_Urn_1.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

And we're done! *Forward probability*, where we already know the model as well as all the parameter values, typically never occurs out in the real world. Next up, a more realistic but still urn-related problem.

Reverse Probability Example
---------------------------

In front of you are :math:`11` urns labeled by a number :math:`u \in \{ 0, 1, ... , 10 \}`. Each urn contains :math:`10` marbles. The urn labeled :math:`u` contains :math:`u` black marbles and :math:`10 - u` white marbles. Fred selects an urn at random (you don't know which) and draws from that urn  :math:`n` times, always putting back the marble he drew. He counts :math:`N_b` black marbles and :math:`N_w = n - N_b` white marbles. After :math:`n = 10` draws, he counted :math:`N_b = 3` black marbles. If we were to draw another marble (the :math:`11^{th}` draw) from the same urn, what is the probability that it would be black?

Another textbook problem, except much harder than the previous one. Here is where Bayesian and Frequentist statistics start to differ. Let's solve this problem twice, once using *Bayes' Theorem* and once using classical methods, so that we can directly compare and contrast.

First up, the Bayesian approach.

We start with our oh-so-handy chart for the model that we'll use. I've circled in :orange:`orange` the main difference between this problem and the *forward probability* one we had earlier:

.. image:: images/Model_Urn_3.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Unlike all the other cases before, we don't know the correct value of one of our parameters; we don't know which urn Fred picked! The probability of getting a single black marble may have been :math:`p = \frac{1}{10}` if Fred chose :math:`u = 1`. It may have been :math:`p = \frac{5}{10}` if Fred chose :math:`u = 5`. Thus, we can't immediately use our model for prediction. Instead, we have data (shown in :green:`green`) that must use to try and *infer* what :math:`u` might be. We can only do predictions after we get this sorted out.

In the Bayesian view, we can never know for sure what the correct value of :math:`u` (and thus :math:`p`) actually is, and we won't try to. You probably noticed that I used capital letters :math:`U` and :math:`P` in our box diagram. This points to the way to our approach: we'll say that :math:`u` can have any value between :math:`0` and :math:`10` and try to find the probabilities of each of those values. In other words, we'll assume that there exists some random variable :math:`U` (and thus :math:`P`) that represents the urn Fred picked.

The random variable :math:`U` will have some sort of initial distribution (our *prior*). We'll use our :green:`data` to modify this *prior* and turn it into a *posterior* distribution. Yup! Our old friend is back:

.. math::
  \text{posterior} = \dfrac{\text{likelihood} \: \cdot \: \text{prior}}{\text{evidence}}

Let's see what this looks like in action:

.. image:: images/Urn_Problem_1.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Ok, that was a lot of information all at once. What happened here? Unlike in `Part 1 <a_primer_on_bayesian_statistics_p1.html>`_ we're not dealing with single events anymore. The unknown value :math:`u` parameterizes our *prior*, *posterior*, and *likelihood* so that the probabilities change when :math:`u` changes. The charts above show this by having :math:`u` on their x-axes. A bit more information:

- **PRIOR** |br| Since Fred chose an urn at random, it makes sense to think that he didn't have a preference for any urn in particular. It should be safe to assume that each urn :math:`u` had a :math:`\frac{1}{11}` chance of being selected.
- **LIKELIHOOD** |br| In Bayesian analysis, this always comes from our model, which is binomial in our case. However, notice that the *likelihood* plot in the top-right corner is not a traditional binomial plot! Normally, when we have a *binomal* random variable:

  .. math::
    X \sim \mathit{Binomial}(n, p)

  We usually see this as a function of :math:`x` with constant :math:`n` and :math:`p`:

  .. math::
    \boldsymbol{P}(X = x) = \binom{n}{x} \cdot p^x (1 - p)^{n - x}

  However, in our case, we already know :math:`x`. From our data we have :math:`\color{ccg}N_b = 3` when :math:`\color{ccg}n = 10`. What we don't know is :math:`p = u / 10`. Thus, our situation looks like this:

  .. math::
    \boldsymbol{P}(\color{ccg}N_b = 3\color{def} \,|\, U = u) = \binom{\color{ccg}10\color{def}}{\color{ccg}3\color{def}} p^{\color{ccg}3\color{def}} (1 - p)^{\color{ccg}10 - 3\color{def}}

  We're looking at this binomial distribution as a function of our parameter :math:`u`.

- **EVIDENCE** |br| This value acts as a normalization constant. It does not depend on the value of :math:`u`, so we have no graph to draw [#]_.
- **POSTERIOR** |br| The final distribution for :math:`U`. Since our *prior* was *uniform*, it looks almost exactly the same as our *likelihood*. It doesn't have a closed form, so I won't write it here. For our purposes, the graph above (calculated numerically) is enough.

Now, how do we go about making a prediction for the :math:`11^{th}` marble? Even after all that work, we still don't know for sure which urn we drew from. Most likely, :math:`u = 3`, so should the probability of drawing a black marble be :math:`\frac{u}{10} = \frac{3}{10}`? Not according to Bayes. The Bayesian approach doesn't decide on one value of :math:`u`, it averages out all of them to make a prediction:

.. image:: images/Urn_Problem_2.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Here, we looked at each possible value of :math:`u`, asked what the probability of drawing a black marble would be if that urn were picked, and then weighed that probability by our *posterior*. The result was :math:`\frac{1}{3}`. Notice that this is a bit over :math:`30\% = \frac{3}{10}`.

Next up, the Frequentist method.

Again, we start with a model:

.. image:: images/Model_Urn_2.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Looks similar doesn't it? No wait, there is one difference! I used a lowercase :math:`u` this time instead of and upper case :math:`U`. According to the Frequentist scheme, we do not assume that :math:`u` has some distribution. Instead we think of :math:`u` as a constant but unknown value. We then try to figure out value of :math:`u` by using an *estimator*.

The most popular estimator around (and the most appropriate to use in this case) is the *maximum likelihood estimator*, or MLE. Basically, we just calculate the *likelihood*, :math:`\boldsymbol{P}(\color{ccg}N_b = 3\color{def} \,|\, U = u)`, like we would when using *Bayes' Theorem*. Then, instead of using this as a building block for our *posterior*, we pick the :math:`u` that gives us the highest probability.

We've already done all the work for this!

.. image:: images/Urn_Problem_3.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Clearly, the most probable value of :math:`u` occurs at :math:`u = 3`. Thus, when we estimate what the :math:`11^{th}` draw will look like, we say we'll have a :math:`30\% = \frac{3}{10}` chance of getting a black marble. This is different than the Bayesian approach!

But wait, this seems wrong. We don't know for sure that :math:`u = 3`, do we? We accounted for that in the Bayesian approach by averaging over all the values in the *posterior*. How do we account for this uncertainty here?

Classically, we usually do this using confidence intervals or p-values. When we use an *estimators* like the MLE, we can calculate how sure/confident we are in our guess of :math:`u`. I won't do this here, but in the real world we would report that value alongside the :math:`30\%` we predicted earlier.

Compare and Contrast
--------------------

We solved Fred's marble problem with two approaches. How did they differ?

When using the *Bayesian* approach:

- We assumed the hole in our model was an unknown distribution represented by the random variable :math:`U`.
- Using the data, we modified a uniform *prior* to generate a *posterior* distribution.
- Once we had a *posterior* distribution, we averaged over all the values to generate our prediction. In this case, we found that the probability of getting a black marble in our :math:`11^{th}` sample as :math:`\frac{1}{3}`, slightly higher than with the *Frequentist* method.

When using the *Frequentist* approach:

- We assumed that the hole in our model was unknown but constant, a value :math:`u`.
- Using the data, we constructed an estimator for the value :math:`u`.
- Once we arrived at a value of :math:`u`, we reported how uncertain we were about this. In the real world, we usually do this using p-values or confidence intervals.
- After reporting our uncertainty, we simply used our estimate of :math:`u` in all future predictions that we generated out of our model. In this case, we found that the probability of getting a black marble in our :math:`11^{th}` sample was :math:`\frac{3}{10}`.

So which method is better? Looking at the above example, you might think that *Bayes* wins hands down. After all, it's the more general estimate of the two. It takes into account all possible values of :math:`U` to make our prediction! Comparatively, the classical method seems to make assumptions that it doesn't need to.

Of course, it's not that black and white. David McKay, the man who engineered this example, did so with the intention of creating this contrast. The classical method is called "classical" for a reason. Historically, people tended to use Frequentist methods much more often than Bayesian ones. What gives? 

For one, when using the Bayesian method, you have to keep track of the entire *prior* distribution and the entire *posterior* distribution. Compare this with a single MLE estimate (one value) that you might make when using the classical approach! Not only that, in real world examples, you won't have nice closed forms of probability distributions; the models grow way too complex for that. You'll have to numerically estimate the *posterior*. Today this doesn't pose as much a challenge, but you can imagine it was a real show-stopper during most of the twentieth century.

Then, there's the problem of *priors*, a topic I spend the rest of this post discussing.

Priors
~~~~~~

Although Bayes published his seminal paper in 1763, doing inference through conditional
probabilities didn't really become popular until the 1990s, when `Markov Chain Monte Carlo`_ methods (used to estimate *posterior* distributions), along with widespread computerization, pushed it to the mainstream. Why is this?

.. _`Markov Chain Monte Carlo`:
  https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo

One common complaint against Bayes was that choosing a *prior* feels very subjective and unscientific [#]_. In the problems above, we always had a pretty obvious choice of *prior*. For example, we assumed that each urn had the same probability of being chosen. In the real world, this choice becomes more tricky. 

The problem becomes easier to appreciate when you're modeling a complex situation. Say you're trying to infer (*reverse probability*) the proportion of people that will vote for a specific mayoral candidate. Furthermore, say that you've constructed a sophisticated model for this situation that uses poll data. What's your *prior*? Do you assume that all proportions are equally likely? This might sound appealing at first, but by doing this, you assume that mayoral candidates are just as likely to barely edge out the election (get :math:`51\%` of the vote) as they are to win in a complete landslide (get :math:`99\%` of the vote). To get a better *prior*, you might first need to know how close most mayoral races are in general. 

Other factors could affect the *prior*. For example, say this candidate is part of a particularly well-liked political party in this city. Should you try to include this in the *prior*, or should you just assume that this information is already implicit in the poll data?

As you'll see below, your choice of *prior* can affect the distribution of the *posterior*, so in some ways the fear of setting an unhelpful (or even hurtful) *prior* is justified. In this last section I want to show you how to mitigate this problem and how, for sufficiently large datasets, choosing a *prior* isn't a problem at all. And who will help me with this? Fred, of course.

Fred
----

I know a guy; his name is Fred. When Fred walks into a room, a smell that people describe as "hair-gel ... probably" assaults all those unfortunate enough to stand near the entrance. Fred enjoys sporting his gold watch, always half visible below his white shirt, as well as his favorite tie, satin black patterned with subtle dollar bills. The first words that pop into the heads of most people who meet Fred? Used car salesman.

One day, Fred comes up to you with a proposition for a simple betting game. Even though you feel slightly faint (most likely because of the inordinate amount of hair-gel particles entering your lungs) you manage to hear out the basic rules: it's a simple coin-toss, where you win :math:`\$1` for every heads and lose :math:`\$1` for every tails. You and Fred keep going until one of you decides to stop.

Of course, you immediately suspect a rigged game. It would be wise to simply turn down the offer, but you don't want to refuse since you know this will make him angry. You agree on the condition that you toss the coin a few times before playing. How can you test for fairness?

Solving the Game
----------------

Let's translate Fred's game into the language of statistics, so that we can put it under heavy
analysis and quantify exactly how much we can trust Fred (if at all). To do this, we'll first define all of the variables/constants we need to solve the problem and create a model of the situation:

- :math:`n`: the number of times we flip the coin (this is a *constant*)
- :math:`N_h`: the number of heads we observe (this is a *random variable*)
- :math:`P_h`: the probability of getting heads in a single toss (this is also a *random
  variable*)

Notice that we're taking the *Bayesian* approach here, because :math:`P_H` is a random variable as opposed to an unknown constant. Our goal is to answer the question: what is the probability distribution of :math:`P_h` given that we have performed :math:`n` tosses and found that :math:`N_h` of them ended up as heads? In other words, we want to find:

.. math::
  \partial\boldsymbol{P}( P_h = p \: | \: N_h = x)

Notice that I used :math:`\partial\boldsymbol{P}` notation as opposed to :math:`\boldsymbol{P}`. This is because :math:`P_h` is a *continuous* random variable as opposed to a discrete one. If the coin is fair, then :math:`P_h` has a high density around :math:`p = 0.5`, but it could theoretically take on any value in the interval :math:`[0, 1]`.

So, how do we actually go about finding this value? Well, we already know what model we should use. Say it with me:

.. image:: images/Model_Fred_1.svg
  :alt: Whoops, something went wrong when fetching this svg.
  :align: center

Furthermore, you may have noticed that this is an example of a *reverse probability* problem, so that our friend Bayes can help us out. According to *Bayes Theorem*:

.. math::
  \text{posterior} = \dfrac{\text{likelihood} \: \cdot \: \text{prior}}{\text{evidence}}

Or, if we substitute in all of our variables:

.. math::
  \partial\boldsymbol{P}(P_h = p \: | \: N_h = x) = 
  \dfrac{\boldsymbol{P}(N_h = x \: | \: P_h = p) \: 
  \cdot \: \partial\boldsymbol{P}(P_h = p)}{\boldsymbol{P}(N_h = x)}

Let's tackle each term one at a time, explaining the intuition behind it and deriving it's value
along the way.

First, we'll look at the *prior* value :math:`\partial\boldsymbol{P}(P_h = p)`. This is the only term in the above relation that we have to guess at or assume. The prior term basically codifies what we originally think about the probability distribution of :math:`P_h`. Since this is Fred we're talking about, we probably don't want to assume that the coin is perfectly fair. In fact, we shouldn't rule out any possibility; it's equally likely to be any value. Thus, we will choose a *uniform* distribution over all the values that :math:`P_h` can take on (values in the interval :math:`[0, 1]`). This leads to:

.. math::
  P_h \sim \mathit{Uniform}(0,1) \implies \partial\boldsymbol{P}(P_h = p) = 
  \mathbf{1}_{[0,1]}(p) = \left\{
  \begin{array}{ll} 
  1, & \quad x \in [0, 1] \\ 
  0, & \quad \text{otherwise} 
  \end{array}
  \right.

The next value we have to calculate is the *likelihood*. This quantity ask the question: if we
assume that :math:`P_h = p` is in fact true, then what is the probability that we get :math:`N_h =
x` heads in :math:`n` tosses? Of course, this is just our binomial model. With this knowledge, we can write:

.. math::
  N_h \: | \: P_h \sim \mathit{Binomial}(n, p) \implies \boldsymbol{P}(N_h = x \: | \: P_h = p) = 
  \binom{n}{x} \cdot p^x (1 - p)^{n - x}

Finally, we turn towards the last value we need, the *evidence*. This value is a bit
different because it doesn't depend at all on the random variable who's distribution we're trying to
estimate :math:`P_h`. Because of this, it's common to see this term as a sort of normalization term
that's not needed when comparing two different "estimates" for the *posterior* distribution.

In this case, however, we want to know the exact value of the *posterior* so we go ahead and compute it. To do this, we note that we can rewrite :math:`\boldsymbol{P}(N_h = x \: | \: n)` using the join distribution between :math:`N_h` and :math:`P_h` and then marginalize over :math:`P_h`. The calculation is pretty cumbersome and also relies on the *Gamma* integral [#]_, but the final result is strikingly simple:

.. math::
  \boldsymbol{P}(N_h = x) = \dfrac{1}{n + 1}

This makes intuitive sense. The *evidence* term in *Bayes' Theorem* calculates the probability that :math:`N_h = x` regardless of the value of :math:`P_h`. We do this by averaging over all possible values of :math:`P_h` in the *prior*. So, if we toss the coin :math:`n = 5` times, we have :math:`6` possible values of :math:`x`. The number of heads could anywhere between :math:`0` and :math:`5`: :math:`x \in \{ 0, 1, 2, 3, 4, 5 \}`. If we have a *uniform prior* (the coin can be biased in either direction or fair) then the chances of getting :math:`x = 0` heads are :math:`\frac{1}{1 + n} = \frac{1}{6}`. The chances of getting :math:`x = 1` are also :math:`\frac{1}{1 + n} = \frac{1}{6}`. For a *uniform prior* all values of :math:`x` are equally likely.

Putting together the *prior*, *likelihood*, and *evidence* yields us the following expression [#]_:

..  math::
  \partial\boldsymbol{P}(P_h = p \: | \: N_h = x) = 
  (n + 1) \cdot \binom{n}{x} \cdot 
  p^x (1 - p)^{n - x} \cdot
  \mathbf{1}_{[0,1]}(p)

This formula probably doesn't tell you much about how you should trust Fred. What does the *posterior* actually look like? Well, it depends on the specific value of :math:`n` we use and the value of :math:`x` we get. To help you visualize this, I graphed both the *prior* and *posterior* in the visualization below. Play around with the values!

.. raw:: html

  <div class="d3-visual" id="bayes-uniform">
    <h3><span class="prior">Uniform Prior</span> and 
      <span class="posterior">Resulting Posterior</span> Distribution</h3>
    <table>
      <tr>
        <td class="labels">\(n\) :  </td>
        <td><input class="ranges" id="n-range-uniform" type="range" min="0" max="160"></td>
        <td><span class="counts" id="n-count-uniform">80</span></td>
      </tr>
      <tr>
        <td class="labels">\(x\) :  </td>
        <td><input class="ranges" id="x-range-uniform" type="range" min="0" max="80"></td>
        <td><span class="counts" id="x-count-uniform">40</span></td>
      </tr>
    </table>
  </div>

To get better intuition about this, try the following combinations:

- :math:`n = 0` and :math:`x = 0`. Why does this happen?
- :math:`n = 20` compared to :math:`n = 120` with any value of :math:`x`. You can see how the *posterior* starts wide, but as more information comes in (increasing :math:`n`), we get more and more sure of the true value.

Now we can figure out whether Fred is using a fair coin or not. To do this we should test the *posterior* for whatever conditions we want. For example, one way to check for a fair coin might be to check where the mean or median are after :math:`n` tosses. If they're within a specified range (say :math:`[0.49, 0.51]`), then we can say the coin is fair. Another, probably more robust way to test for fairness is to require that :math:`95\%` of the probability lies in a specified range.

The specifics of these tests depends on how stringent we want to be: being more confident requires a skinnier *posterior* and that, in turn, requires more data. I'll let you decide how you would want to test for fairness in this case. 

What I want to do instead is focus on the *prior*. I mentioned at the beginning of this section that we would see how a changing *prior* can affect our final results. What if we wanted to use a different *prior*?

Fred Again
----------

I know a guy; his name is Fred. When Fred walks into a room, a ray of sunlight illuminates his face, even on cloudy days. Every morning, he asks about your day and listens intently. He makes an effort to organize fun events and always includes everyone he can. You've known him for years, but he's never missed your birthday. A few weeks ago, you heard a rumor that he risked his life to save a litter of puppies from a burning shelter; you believed it.

One day, Fred comes up to you with a proposition for a simple betting game. Even though you feel slightly faint (most likely because of his blinding smile) you manage to hear out the basic rules: it's a simple coin-toss, where you win :math:`\$1` for every heads and lose :math:`\$1` for every tails. You and Fred keep going until one of you decides to stop.

Of course, you immediately suspect a rigged game; rigged in your favor that is. He probably heard about your case of *can't-tell-the-weather-itus* and wants to cheer you up. You don't want to take advantage of him so you agree on the condition that you toss the coin a few times before playing. How can you test for fairness?

You Already Know the Answer
---------------------------

Hopefully, the story above should sound a bit familiar. As opposed to Fred #1, most people would trust Fred #2 a lot more. It would seem a unfair to use a *uniform* distribution as a *prior* here with Fred #2, like we used for Fred #1. Can we change our *prior* to reflect our newfound trust?

Of course. We can use a more pointy and centered distribution instead! I recommend the `Beta`_ distribution:

.. math::
  \partial\boldsymbol{P}(P_h = p) = 
  \dfrac{\Gamma(\alpha) \Gamma(\beta)}{\Gamma(\alpha + \beta)} p^{\alpha - 1} (1 - p)^{\beta - 1}

I already did all the work for you here, it's very similar to the case with the *uniform* distribution. Here's the result:

.. raw:: html

  <div class="d3-visual" id="bayes-beta">
    <h3><span class="prior">Beta Prior</span> and 
      <span class="posterior">Resulting Posterior</span> Distribution</br>
      (Compared to a <span class="gray">Posterior from Uniform Prior</span>)</h3>
    <table>
      <tr>
        <td class="labels">\(n\) :  </td>
        <td><input class="ranges" id="n-range-beta" type="range" min="0" max="200"></td>
        <td><span class="counts" id="n-count-beta">100</span></td>
      </tr>
      <tr>
        <td class="labels">\(x\) :  </td>
        <td><input class="ranges" id="x-range-beta" type="range" min="0" max="100"></td>
        <td><span class="counts" id="x-count-beta">50</span></td>
      </tr>
    </table>
    <table>
      <tr>
        <td class="labels">\(\alpha\) :  </td>
        <td class="numeric">
          <input id="alpha-numeric-beta" type="number" min="0" value="5"></td>
        <td class="labels">\(\beta\)  : </td>
        <td class="numeric">
          <input id="beta-numeric-beta" type="number" min="0" value="5"></td>
      </tr>
    </table>
  </div>

Now, you can see exactly how changing *priors* affects our *posterior* distribution. Play around with the values for :math:`n`, :math:`x`, :math:`\alpha`, and :math:`\beta`. The third distribution (in gray) represents the *posterior* assuming that used a *uniform prior*.

Some fun values to try:

- :math:`\alpha = 0` and :math:`\beta = 0`. Yup! Plug in these value into the equation for the Beta distribution to see why.
- :math:`\alpha = 10` and :math:`\beta = 1` or vice-versa. This makes the *prior* very one-sided. You can see how this pulls the *posterior*, especially for low values of :math:`n`.
- :math:`\alpha = 0.05` and :math:`\beta = 0.05`. What? It can do that?

Done playing? 

I think we can now finally answer our question on *priors*. While varying inputs and parameters, I hope you noticed exactly how sensitive our *posteriors* can be when we have low amounts of data. Conversely, I also hope you noticed how insignificant our *prior* became when we had large amounts of data. The fact that *prior* distributions don't matter much once we have enough input data is known as the `Bernstein von Mises Theorem`_.

.. _`Bernstein von Mises Theorem`:
  https://en.wikipedia.org/wiki/Bernstein%E2%80%93von_Mises_theorem

Conclusions
~~~~~~~~~~~

We've gone through a lot of mathematics at this point in the tutorial. We covered *Bayes' Theorem* and how we can view it as a means of updating prior knowledge with data. We talked about modeling, compared Bayes methods to Frequentist methods, as well as how each methodology has both it's strengths and weaknesses . Finally, just not, we explored how *priors* affect *posteriors*.

Is that all there is to learn? I think we both know the answer here.

As much as I would have liked, there's a whole plethora of topics I haven't even mentioned nor scratched the surface of. We didn't talk about `conjugate priors`_, a building block of many complex models. There's `nonparametric models`_, where the parameters :math:`\theta` are infinite dimensional vectors. `Maximum a Posteriori`_ (MAP) estimators, a combination of Bayesian and Frequentist methods. Not to mention the `Dirichlet Processes`_ and it's applications to natural language processing.

.. _`conjugate priors`:
  http://lesswrong.com/lw/5sn/the_joys_of_conjugate_priors/

.. _`nonparametric models`:
  http://stat.columbia.edu/~porbanz/papers/porbanz_BNP_draft.pdf

.. _`Maximum a Posteriori`:
  https://wiseodd.github.io/techblog/2017/01/01/mle-vs-map/

.. _`Dirichlet Processes`:
  http://fastml.com/bayesian-machine-learning/

I hope you view this tutorial as a stepping stone for more learning in the future. Take a look at the resources and footnotes below for a new starting point!

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

.. [#] The :math:`\partial` symbol notation comes from the fact that, for a continuous random variable, you can calculate it's distribution by taking a derivative. For example, if :math:`X` is a continuous random variable with density function :math:`f`, then we can write :math:`f` like this:

.. math::
  \begin{array}{rcl}
    f(x) & = & \dfrac{d}{dx} \boldsymbol{P}(X < x)
  \end{array}

.. [#] This can get philosophical very quickly. On one hand, we know about many systems that we can predict with almost absolute certainty. On the other hand, chaos theory and quantum mechanics and all that.
.. [#] If used correctly, of course. Even the most flexible models, such as neural nets or nearest neighbor approximations fail when used incorrectly. Words of advice: "Don't try to put a square model into a round phenomena".
.. [#] David McKay was a British Physicist who wrote a great book on information theory. See the **Textbooks** section above.
.. [#] In any problem involving *Bayes' Theorem*, the *evidence* is usually the most difficult to calculate. Below is a derivation of the *evidence* term for the urn problem. As far as I'm aware, there's no closed form for this summation, so I just calculated it numerically. I used :math:`n = 10` as the number of marbles drawn from the urn. I used :math:`u_t = 11` as the total amount of urns.

.. math::
  \boldsymbol{P}(N_b = 3) =& \dfrac{1}{u_t} \sum_{u = 0}^{u_t -1} \binom{n}{3} p^{3} (1 - p)^{n - 3} \\
  =& \dfrac{1}{11} \sum_{u = 0}^{10} \binom{10}{3} \dfrac{u}{10}^{3} (1 - \dfrac{u}{10})^{n - 3} \\
  =& 0.08272661

.. [#] The more important reason probably stemmed from the difficulty in calculating a *posterior* distribution without computer aid. When doing Bayesian statistics by hand, you often cannot calculate the *posterior* using analytical methods, especially more complex ones. So you have to numerically estimate them or their properties (like mode or median). This is a lot more tedious than simply calculating one number, the estimator (most likely MLE), that is required under the Frequentist paradigm.
.. [#] Here is the gruesome derivation for those interested. You know you did good math if the equation start simple, explodes into a unmanageable mess, and finally collapses into a surprisingly neat expression.

.. math::
  \boldsymbol{P}(N_h = x \: | \: n) =& \int_{p} \partial\boldsymbol{P}(N_h = x, P_h = p \: | \: n) \\
  & \scriptstyle\text{By the relationship between marginal and joint distributions} \\
  =& \int_{p} \boldsymbol{P}(N_h = x \: | \: P_h = p, n) \ \partial\boldsymbol{P}(P_h = p \: | \: n) \\
  & \scriptstyle\text{By the definition of conditional probability} \\
  =& \int_{p} \binom{n}{x} p^x (1 - p)^{n - x} \ \partial\boldsymbol{P}(P_h = p \: | \: n) \\
  & \scriptstyle\text{By the definition of } \textit{likelihood } \text{above} \\
  =& \int_{p} \binom{n}{x} p^x (1 - p)^{n - x} \: \mathbf{1}_{[0, 1]}(p) \: dp \\
  & \scriptstyle\text{By the definition of } \textit{prior } \text{above} \\
  =& \int_{0}^{1} \binom{n}{x} p^x (1 - p)^{n - x} \: dp \\
  & \scriptstyle\text{By taking care of the indicator function} \\
  =& \binom{n}{x} \dfrac{x! \: (n - x)!}{\Gamma (n + 2)} \\
  & \scriptstyle\text{By integrating using the Gamma integral} \\
  =& \binom{n}{x} \dfrac{x! \: (n - x)!}{(n + 1)!} \\
  & \scriptstyle\text{By the definition of the Gamma function} \\
  =& \dfrac{n!}{(n - x)! \: x!} \dfrac{x! \: (n - x)!}{(n + 1)!} \\
  & \scriptstyle\text{By the definition of the Binomial Coefficient} \\
  =& \dfrac{1}{n + 1} \\
  & \scriptstyle\text{Canceling out the factorials}

.. [#] If you really know your distributions, you'll note that the *posterior* in this case is a `Beta`_ distribution. This is no accident, and neither is the fact that I use the *Beta* distribution as a *prior* in the subsequent example! The *Beta* distribution is called the *conjugate prior* of the binomial distribution.
.. [#] For more great statistics lines (and you know you want more) see this `page of 77 best Gelman quotes`_.

.. _`page of 77 best Gelman quotes`:
  http://www.stat.columbia.edu/~gelman/book/gelman_quotes.pdf
.. _`Beta`:
  https://en.wikipedia.org/wiki/Beta_distribution