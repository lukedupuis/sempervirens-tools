# Sempervirens Tools

A set of tools for various purposes

![Tests badge](https://github.com/lukedupuis/sempervirens-tools/actions/workflows/main.yml/badge.svg?event=push) ![Version badge](https://img.shields.io/static/v1?label=Node&labelColor=30363c&message=16.x&color=blue)

## Installation

`npm i @sempervirens/tools`;

## Tools

### Server Tools

#### startServer

Starts a Node Express server while keeping a set of sockets in order to stop the server later. (Mainly for use in tests.)

#### stopServer

Stops a server by ID started with `startServer`. (Mainly for use in tests.)

#### stopAllServers

Stops all servers started with `startServer`. (Mainly for use in tests.)

### timestamp

Uses Moment.js to return a default format `[MM-DD-YY hh:mm:ssa]` and formattable string.

### duration

Calculates a duration between a `start` and `end` parameter, both of which may be a `moment` or `Date` object. If not given, `end` is the current moment.