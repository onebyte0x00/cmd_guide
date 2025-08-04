// Initialize syntax highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Load highlight.js if not already loaded by Jekyll
    if (typeof hljs === 'undefined') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css';
        document.head.appendChild(link);
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js';
        script.onload = function() {
            hljs.highlightAll();
            // Add specific language for batch
            hljs.registerLanguage('batch', function(hljs) {
                return {
                    keywords: 'echo off on if else for in do goto call set',
                    contains: [
                        {
                            className: 'variable',
                            begin: /%[^%]+%/
                        },
                        {
                            className: 'symbol',
                            begin: /@|::/
                        },
                        hljs.COMMENT('REM', '$', {relevance: 10}),
                        hljs.COMMENT('::', '$', {relevance: 10})
                    ]
                };
            });
            hljs.highlightAll();
        };
        document.head.appendChild(script);
    }
    
    // Add copy button to code blocks
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.type = 'button';
        button.innerText = 'Copy';
        
        const pre = codeBlock.parentNode;
        pre.style.position = 'relative';
        pre.insertBefore(button, codeBlock);
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                button.innerText = 'Copied!';
                setTimeout(function() {
                    button.innerText = 'Copy';
                }, 2000);
            });
        });
    });
});
