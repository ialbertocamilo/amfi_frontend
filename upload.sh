#!/usr/bin/env zsh

APP_NAME="amfi_frontend"
VERSION="latest"
DOCKER_USERNAME="isvgxd"
DOCKER_PASSWORD=""
set -e 

echo $DOCKER_USERNAME
echo $DOCKER_PASSWORD


echo "$DOCKER_USERNAME/$APP_NAME:$VERSION"
echo "Iniciando sesión en Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "Construyendo la imagen Docker..."
docker build -t "$APP_NAME:$VERSION" .

echo "Etiquetando la imagen..."
docker tag "$APP_NAME:$VERSION" "$DOCKER_USERNAME/$APP_NAME:$VERSION"

echo "Subiendo la imagen a Docker Hub..."
docker push "$DOCKER_USERNAME/$APP_NAME:$VERSION"

echo "¡Imagen subida con éxito!"