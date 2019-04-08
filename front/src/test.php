<?php
// créer liste de 1 à 1000
// divisible par 3 affiché "well"
// divisible par 5 affiché "job"
// divible par 3 et 5 "well job"
// sinon le chiffre
function test()
{

    for ($i = 1; $i <= 15; $i++) {
         if (($i % 5 && $i % 3) == 0) {
            echo "well job";
        }
        else if ($i % 3 == 0) {
            echo "well";
        } else if ($i % 5 == 0) {
            echo "job";
        }  else {
            echo $i;
        }
    }
}
1 echo $i
2 echo $i 
3 echo "well"
4 echo $i 
5 echo "job"
6 echo "well"
7 echo $i
8 echo $i 
9 echo "well"
10 echo "job"
11 echo $i 
12 echo "well"
13 echo $i
14 echo $i
15 echo "well job"