FROM mulgo/typo3-fullstack:<%=cleanTypo3Version %>
LABEL Name=<%=nameLabel %> Version=1.0.0

WORKDIR /var/www/html
COPY . /var/www/html
CMD httpd -DFOREGROUND 
EXPOSE 80
