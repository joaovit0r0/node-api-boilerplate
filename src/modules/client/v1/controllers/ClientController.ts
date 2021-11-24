// Modules
import { DeepPartial } from 'typeorm';
import { Request, Response } from 'express';

// Library
import { ClientRepository } from 'library/database/repository/ClientRepository';
import { BaseController } from '../../../../library';

// Decoretors
import { Controller, Delete, Get, Middlewares, Post, PublicRoute, Put } from '../../../../decorators';

// Models
import { EnumEndpoints } from '../../../../models';

// Routes
import { RouteResponse } from '../../../../routes';

// Entities
import { Client } from '../../../../library/database/entity/Client';

// Repositories

// Validators
import { ClientValidator } from '../middlewares/ClientValidator';

@Controller(EnumEndpoints.CLIENT_V1)
export class ClientController extends BaseController {
    /**
     * @swagger
     * /v1/client:
     *   get:
     *     sumary: Lista de clientes
     *     tags: [Client]
     *     consumes:
     *       - aplication/json
     *      produces:
     *       - aplication/json
     *      parameters:
     *       - $ref: '#/components/parameters/listPageRef'
     *       - $ref: '#/components/parameters/listSizeRef'
     *       - $ref: '#/components/parameters/listOrderRef'
     *       - $ref: '#/components/parameters/listOrderByRef'
     *      responses:
     *        $ref: '#/components/responses/baseResponse'
     *
     */
    @Get()
    @PublicRoute()
    public async get(req: Request, res: Response): Promise<void> {
        const [rows, count] = await new ClientRepository().list<Client>(ClientController.listParams(req));

        RouteResponse.success({ rows, count }, res);
    }

    /**
     * @swagger
     * /v1/client/{clientId}:
     *   get:
     *     summary: Retorna informações de um cliente
     *     tags: [Client]
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: clientId
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       $ref: '#/components/responses/baseResponse'
     */
    @Get('/:id')
    @PublicRoute()
    @Middlewares(ClientValidator.onlyId())
    public async getOne(req: Request, res: Response): Promise<void> {
        RouteResponse.success({ ...req.body.clientRef }, res);
    }

    /**
     * @swagger
     * /v1/client:
     *   post:
     *     summary: Cadastra um client
     *     tags: [Client]
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             example:
     *               name: clientName
     *             required:
     *               - name
     *             properties:
     *               name:
     *                 type: string
     *     responses:
     *       $ref: '#/components/responses/baseCreate'
     */
    @Post()
    @PublicRoute()
    @Middlewares(ClientValidator.post())
    public async add(req: Request, res: Response): Promise<void> {
        const newClient: DeepPartial<Client> = {
            name: req.body.name
        };

        await new ClientRepository().insert(newClient);

        RouteResponse.successCreate(res);
    }

    /**
     * @swagger
     * /v1/client:
     *   put:
     *     summary: Altera um cliente
     *     tags: [Client]
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             example:
     *               id: clientId
     *               name: clientName
     *             required:
     *               - id
     *               - name
     *             properties:
     *               id:
     *                 type: string
     *               name:
     *                 type: string
     *     responses:
     *       $ref: '#/components/responses/baseEmpty'
     */
    @Put()
    @PublicRoute()
    @Middlewares(ClientValidator.put())
    public async update(req: Request, res: Response): Promise<void> {
        const client: Client = req.body.clientRef;

        client.name = req.body;

        await new ClientRepository().update(client);

        RouteResponse.successEmpty(res);
    }

    /**
     * @swagger
     * /v1/client/{clientId}:
     *   delete:
     *     summary: Apaga um cliente definitivamente
     *     tags: [Client]
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: clientId
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       $ref: '#/components/responses/baseResponse'
     */
    @Delete('/:id')
    @PublicRoute()
    @Middlewares(ClientValidator.onlyId())
    public async remove(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        await new ClientRepository().delete(id);

        RouteResponse.success({ id }, res);
    }
}
