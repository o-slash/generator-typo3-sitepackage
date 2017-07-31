FROM mulgo/typo3-toolchain:<%=cleanTypo3Version %>
LABEL Name=<%=nameLabel %> Version=1.0.0

WORKDIR /var/www/site
COPY . /var/www/site
EXPOSE 80
CMD ["run-typo3.sh" ]