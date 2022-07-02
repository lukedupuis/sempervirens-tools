# Sempervirens Tools

A set of tools for various purposes

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