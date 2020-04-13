#!/bin/sh
append(){
  echo $1
  awk 'NR==4 {$0="import * as WiddeeTypes from \"types/backend\"\n"} { print $0}' $1 > $1.tmp
  mv $1.tmp $1
}
for f in $(find ./src -name __generated__);
do 
for i in $f/*.ts;do append $i;done
done