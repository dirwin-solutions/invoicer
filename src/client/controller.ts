import { Request, Response, NextFunction } from 'express'
import { Client } from './types'
import ClientService from './service'
import Controller from '../base/Controller'

export default class ClientController extends Controller<Client> {
  constructor(service: ClientService) {
    super(service)
  }
}
