#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Dawid Minorczyk'
SITENAME = 'mimsy.io'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = 'English'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'))

# Social widget
SOCIAL = (('My GitHub', 'https://github.com/theMimsy'))

DEFAULT_PAGINATION = 10

# Plugins
PLUGIN_PATHS = ['./plugins']
PLUGINS = [
    'pelican-ipynb.markup',
    'dynamic.pelican_dynamic',
    'render_math',
]

# JUPYTER plugin options
IPYNB_USE_META_SUMMARY = True

# MathJax plugin options
MATH_JAX = {
    'align': 'center',
    'linebreak_automatic': True,
    'tex_extensions': [],
    '3rd_extensions': {"img": "https://cdn.rawgit.com/pkra/mathjax-img/1.0.0/"}
}

# Paths and metadata
STATIC_PATHS = [
    'images',
    'data',
    'extra/favicon.ico'
]

EXTRA_PATH_METADATA = {
    'extra/favicon.ico' : {'path' : 'favicon.ico'}
}


# Readers
READERS = {'html' : None}

# Theming
THEME = r'C:\Users\dmino\Documents\projects\Pelican_Themes\pelican-themes\html5-dopetrope'
DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = True
ABOUT_IMAGE = ''
ABOUT_TEXT = '''A blog written by a guy who prefers to look at the world through math, data, and python. Anytime I have too much time on my hands, you can be sure you're about to learn. </br> - Dawid Minorczyk'''

# Footers as superscripts
DOCUTILS_SETTINGS = {
    'footnote_references' : 'superscript',
    'field_name_limit' : 0
}

# Article ordering
ARTICLE_ORDER_BY = 'sortorder'

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
