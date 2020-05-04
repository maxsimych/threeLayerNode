import { Router } from 'express';
import {
  addValidator, deleteValidator, editValidator
} from './ghContact.validator';
import type { IEditBody } from './ghContact.interface';
import { container } from 'tsyringe';
import { GhContact } from './ghContact.service';
import { expressCatch } from 'src/util/expressCatch';

const router = Router();

router.get('/', expressCatch(async (req, res) => {
  const ghContact = container.resolve(GhContact);
  const result = await ghContact.getAll();
  if (!result.length) return res.sendStatus(204);
  res.json(result);
}));
router.post('/add', addValidator, expressCatch(async (req, res) => {
  const ghContact = container.resolve(GhContact);
  const result = await ghContact.add(req.body.username as string);
  if (!result) return res.sendStatus(400);
  
  res.sendStatus(200);
}));
router.post('/delete', deleteValidator, expressCatch(async (req, res) => {
  const ghContact = container.resolve(GhContact);
  const result = await ghContact.delete(req.body.id as string);
  if (result.n !== 1) return res.sendStatus(400);
  
  res.sendStatus(200);
}));
router.post('/edit', editValidator, expressCatch(async (req, res) => {
    const ghContact = container.resolve(GhContact);
    const result = await ghContact.edit(req.body as IEditBody);
    if (result.n !== 1) return res.sendStatus(400);
    
    res.sendStatus(200);
}));

export { router };