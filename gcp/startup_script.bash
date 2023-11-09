#! apache is a long software that take huge long time to download so because of that we cant install it again and again thus direct apache installation could be there

#!/bin/bash
apt update 
apt -y install apache2
echo "Hello world from $(hostname) $(hostname -I)" > /var/www/html/index.html
