import { Request, Response } from "express";
import { movieServices } from "@/services/movie.services";
import { MovieCreateData } from "@/protocols";
import httpStatus from "http-status";
import { invalidDataError } from "@/errors/invalid.data";

async function create(req: Request, res: Response) {
  const movie = req.body as MovieCreateData;

  await movieServices.create(movie);

  return res.sendStatus(httpStatus.CREATED);
}

async function read(req: Request, res: Response) {
  const movies = await movieServices.read();

  return res.status(httpStatus.OK).send(movies);
}

async function update(req: Request, res: Response) {
  const movie = req.body as MovieCreateData;
  let { id } = req.params;

  if (!/^[0-9]+$/.test(id)) {
    throw invalidDataError("Id must be a number!");
  }

  await movieServices.update(movie, parseInt(id));

  return res.sendStatus(httpStatus.OK);
}

async function deleteById(req: Request, res: Response) {
  let { id } = req.params;

  if (!/^[0-9]+$/.test(id)) {
    throw invalidDataError("Id must be a number!");
  }

  await movieServices.deleteById(parseInt(id));

  return res.sendStatus(httpStatus.OK);
}

export const movieControllers = { create, read, update, deleteById };
