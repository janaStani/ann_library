#!/bin/bash

rm -r ./out/*
cp src/index.html out/index.html
tsc

cp data/mnist_handwritten.js out/mnist_handwritten.js