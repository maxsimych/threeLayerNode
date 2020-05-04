import { injectable, inject } from 'tsyringe';
import {
  ghContactModelSymbol, graphqlSymbol, objectIdSymbol, gh_tokenSymbol
} from 'src/iocContainer/iocContainer.types';
import type { graphql as graphqlType } from '@octokit/graphql/dist-types/types';
import type {
  IGhContactModel, ObjectIdConstructor, IGhContact, IEditBody, ICreatObj
} from './ghContact.interface';

@injectable()
export class GhContact {
  constructor(
    @inject(ghContactModelSymbol) private GhContactModel: IGhContactModel,
    @inject(graphqlSymbol) private graphql: graphqlType,
    @inject(objectIdSymbol) private ObjectId: ObjectIdConstructor,
    @inject(gh_tokenSymbol) private readonly GH_TOKEN: string
  ) { }

  public async getAll(): Promise<IGhContact[]> {
    return this.GhContactModel.find({}, '-__v -updatedAt');
  }
  
  public async add(username: string) {
    const response = await this.graphql(`query userInfo($username: String!) {
      user(login:$username) {
        avatarUrl
        bio
        email
        name
        location
      }
    }
    `, {
      username,
      headers: {
        authorization: `token ${this.GH_TOKEN}`
      }
    });
    if (!response) return null;
    const {
      name, avatarUrl, bio, email, location
    } = response.user;
    const createObj: ICreatObj = { username };
    if (name) createObj.name = name;
    if (avatarUrl) createObj.avatarUrl = avatarUrl;
    if (bio) createObj.bio = bio;
    if (email) createObj.email = email;
    if (location) createObj.location = location;
    
    return this.GhContactModel.create(createObj);
  }

  public async delete(id: string) {
    const _id = new this.ObjectId(id);
    return this.GhContactModel.deleteOne({ _id })
  }

  public async edit(body: IEditBody) {
    const { id, ...rest } = body;
    const _id = new this.ObjectId(id);
    return this.GhContactModel.updateOne({
      _id
    }, {
      ...rest
    })
  }
}