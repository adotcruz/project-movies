import express from 'express';
import fetch from 'node-fetch';

export class MovieHTTP {
  static GET = async <T extends {}>(url: string): Promise<T | null> => {
    console.log('making GET request to: ', url);
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      return response.json();
    } catch (e) {
      console.log('GET error with:', url);
      console.log(e);
      return null;
    }
  };

  static SEND_OK = async (res: express.Response, body: any) => {
    if (body) {
      res.status(200).send(body);
    } else {
      res.sendStatus(200);
    }
  };

  static SEND_501 = async (res: express.Response, body: any) => {
    if (body) {
      res.status(501).send(body);
    } else {
      res.sendStatus(501);
    }
  };

  static SEND_400 = async (res: express.Response, errMsg: any) => {
    if (errMsg) {
      res.status(400).send({
        errorMessage: errMsg,
      });
    } else {
      res.sendStatus(400);
    }
  };
}
