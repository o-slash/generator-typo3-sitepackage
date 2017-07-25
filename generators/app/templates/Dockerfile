FROM centos:7
LABEL Name=<%=nameLabel %> Version=1.0.0
RUN yum install -y https://centos7.iuscommunity.org/ius-release.rpm && yum clean all
RUN yum install -y apache php<%= phpVer %>u php<%= phpVer %>u-cli php<%= phpVer %>u-mysqlnd php<%= phpVer %>u-gd php<%= phpVer %>u-soap php<%= phpVer %>u-xml php<%= phpVer %>u-json php<%= phpVer %>u-mbstring ImageMagick && yum clean all
RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer
WORKDIR /var/www/html
EXPOSE 80
