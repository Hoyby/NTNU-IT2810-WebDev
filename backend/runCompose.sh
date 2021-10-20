#!/bin/sh


# Define Schema
curl -X POST localhost:8080/alter --data-binary '@schema.txt'

echo
sleep 3
echo

# Create user
curl -H "Content-Type: application/rdf" -X POST 'localhost:8080/mutate?commitNow=true' -d $'{  set {
    <_:user> <DisplayName> "micheldiz" .
    <_:user> <GitHubAccessToken> "${some accessToken}" .
    <_:user> <GitHubID> "${some GitHubID}" .
    <_:user> <Reputation> "0" .
    <_:user> <CreationDate> "0" .
    <_:user> <LastAccessDate> "0" .
    <_:user> <Location> "Earth" .
    <_:user> <Type> "User" .
  }}'

echo
sleep 3
echo

# Mark to just run once
curl -H "Content-Type: application/rdf" -X POST 'localhost:8080/mutate?commitNow=true' -d $'{set {  _:check <runOnce> "true" . }}'

