/* tslint:disable:no-any */
import {operation, param, requestBody} from '@loopback/rest';
import {Shipment} from '../models/shipment.model';
import { ResponseMessage } from '../models/response-message.model';
import {BlockChainModule} from '../blockchainClient';

let blockChainClient = new BlockChainModule.BlockchainClient();


/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by Shipment
 * An asset named Shipment
 */
export class ShipmentController {
  constructor() {}

/**
   * POST
   * @param requestBody Model instance data
   * @returns ResponseMessage - Request was successful or not
*/
  @operation('post', '/Shipment', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } },
      },
    },
  })
  async shipmentCreate(@requestBody() shipment: Shipment): Promise<ResponseMessage> {

    try {
      let networkObj = await blockChainClient.connectToNetwork();
      let transactionID = await blockChainClient.addShipment(networkObj.contract,shipment);
      let responseMessage: ResponseMessage = new ResponseMessage({ message: `added Shipment to Blockchain with TransactionID - ${transactionID}` });
      return responseMessage;
    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error, statusCode: '400' });
      return responseMessage;
    }
  }

  /**
   * 
   * 

   * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
   * @returns Request was successful
   */
  @operation('get', '/Shipment')
  async shipmentFind(@param({name: 'filter', in: 'query'}) filter: string): Promise<Shipment[]> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param id Model id
   * @returns Request was successful
   */
  @operation('head', '/Shipment/{id}')
  async shipmentExists(@param({name: 'id', in: 'path'}) id: string): Promise<{
  exists?: boolean;
}> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param id Model id
   * @param filter Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
   * @returns Request was successful
   */
  @operation('get', '/Shipment/{transactionId}')
  async shipmentFindById(@param({name: 'transactionId', in: 'path'}) transactionId: string, @param({name: 'filter', in: 'query'}) filter: string): Promise<Shipment> {
    
    try{
      let networkObj = await blockChainClient.connectToNetwork();
      let shipment: Shipment = await blockChainClient.getShipmentByTransactionId(networkObj.contract, transactionId);

      return shipment;
    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error, statusCode: '400' });
      throw responseMessage;
    }


  }

  /**
   * 
   * 

   * @param requestBody Model instance data
   * @param id Model id
   * @returns Request was successful
   */
  @operation('put', '/Shipment/{id}')
  async shipmentReplaceById(@requestBody() requestBody: Shipment, @param({name: 'id', in: 'path'}) id: string): Promise<Shipment> {
    throw new Error('Not implemented');
  }

  /**
   * 
   * 

   * @param id Model id
   * @returns Request was successful
   */
  @operation('delete', '/Shipment/{id}')
  async shipmentDeleteById(@param({name: 'id', in: 'path'}) id: string): Promise<{
  
}> {
    throw new Error('Not implemented');
  }

}

