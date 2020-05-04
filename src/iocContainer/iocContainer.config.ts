import { container } from 'tsyringe';
import { GhContactModel } from 'src/component/ghContact/ghContact.model';
import { graphql } from '@octokit/graphql';
import { ObjectId } from 'mongodb';
import {
  ghContactModelSymbol, graphqlSymbol, objectIdSymbol, gh_tokenSymbol
} from './iocContainer.types';
import { GH_TOKEN } from 'src/config';
// import type { IGhContactModel, ObjectIdConstructor } from '../component/ghContact/ghContact.interface';

container.register(ghContactModelSymbol, {
  useValue: GhContactModel
});
container.register(graphqlSymbol, {
  useValue: graphql
});
container.register(objectIdSymbol, {
  useValue: ObjectId
});
container.register(gh_tokenSymbol, {
  useValue: GH_TOKEN
})

