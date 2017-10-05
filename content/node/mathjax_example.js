// Create SVG files from math in blog posts
var mjAPI = require("mathjax-node");
var fs = require("fs");

mjAPI.config({
  MathJax: {
    config: ['MMLorHTML.js'],
    TeX: { extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js',], equationNumbers: { autoNumber: 'AMS' } }, // traditional MathJax configuration
    jax: ['input/TeX','input/MathML','output/HTML-CSS'],
    showMathMenu: true,
    messageStyle: 'normal',
    'HTML-CSS': {
      styles: { '.MathJax_Display, .MathJax .mo, .MathJax .mi, .MathJax .mn': {color: 'inherit ! important'} },
      linebreaks: { automatic: "+ linebreak +", width: '90% container' },
    },
  }
});
mjAPI.start();

var mathCode = `
  N_h \\sim \\mathit{Binomial}(n, P_h)
`;
var filePath = '../images/mathjax-out/'
var svgName  = 'binom_Nh_cp_h.svg'

mjAPI.typeset({
  math: mathCode,
  format: "TeX", // "inline-TeX", "MathML"
  svg: true,
}, function (data) {
  if (!data.errors) {
    console.log("Creating SVG from: " + mathCode);

    out = data.svg.replace('style="', 'style="color: #5d5d5d;font-size: x-large;');
    console.log(out)

    fs.writeFile(filePath + svgName, out, function (err) {
      if (err) throw err;
    });
    console.log("Saved!");
  }
});

/*
"MathJax.Hub.Config({" +
        "    config: ['MMLorHTML.js']," +
        "    TeX: { extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js',], equationNumbers: { autoNumber: 'AMS' } }," +
        "    jax: ['input/TeX','input/MathML','output/HTML-CSS']," +
        "    extensions: ['tex2jax.js','mml2jax.js','MathMenu.js','MathZoom.js','[img]/img.js']," +
        "    displayAlign: '"+ align +"'," +
        "    displayIndent: '"+ indent +"'," +
        "    showMathMenu: true," +
        "    messageStyle: 'normal'," +
        "    tex2jax: { " +
        "        inlineMath: [ ['\\\\(','\\\\)'] ], " +
        "        displayMath: [ ['$$','$$'] ]," +
        "        processEscapes: true," +
        "        preview: 'TeX'," +
        "    }, " +
        "    'HTML-CSS': { " +
        "        styles: { '.MathJax_Display, .MathJax .mo, .MathJax .mi, .MathJax .mn': {color: 'inherit ! important'} }," +
        "        linebreaks: { automatic: "+ linebreak +", width: '90% container' }," +
        "    }, " +
        "}); " +
        "if ('default' !== 'default') {" +
            "MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready',function () {" +
                "var VARIANT = MathJax.OutputJax['HTML-CSS'].FONTDATA.VARIANT;" +
                "VARIANT['normal'].fonts.unshift('MathJax_default');" +
                "VARIANT['bold'].fonts.unshift('MathJax_default-bold');" +
                "VARIANT['italic'].fonts.unshift('MathJax_default-italic');" +
                "VARIANT['-tex-mathit'].fonts.unshift('MathJax_default-italic');" +
            "});" +
            "MathJax.Hub.Register.StartupHook('SVG Jax Ready',function () {" +
                "var VARIANT = MathJax.OutputJax.SVG.FONTDATA.VARIANT;" +
                "VARIANT['normal'].fonts.unshift('MathJax_default');" +
                "VARIANT['bold'].fonts.unshift('MathJax_default-bold');" +
                "VARIANT['italic'].fonts.unshift('MathJax_default-italic');" +
                "VARIANT['-tex-mathit'].fonts.unshift('MathJax_default-italic');" +
            "});" +
        "}";
*/