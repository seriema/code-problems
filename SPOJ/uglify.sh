#!/bin/bash

# uglify (run `npm install uglifyjs [-g]` if you don't have it)
# --screw-ie8     Don't try to be IE-proof
# --mangle-props  Mangle property names
# -m              Mangle names/pass mangler options.
# -e              Embed everything in a big function
# -c              Enable compressor/pass compressor options
# -o              Output file
uglifyjs app.js --screw-ie8 --mangle-props -m -e -c -o app.min.js

# calc size savings (http://superuser.com/a/570920)
SIZE1=$(stat -f "%z" app.js)
SIZE2=$(stat -f "%z" app.min.js)
PERC=$(bc <<< "scale=2; ($SIZE2 - $SIZE1)/$SIZE1 * 100")
echo "minified $PERC %"

# simple test that it's still working
echo ""
sdiff <(cat input.txt | node app.min.js) expected.txt
