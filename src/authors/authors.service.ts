import { Injectable } from '@nestjs/common';
import { authorsMocking } from '../_mocks/authors.mock';

@Injectable()
export class AuthorsService {
  private authors = authorsMocking;

  // create(createAuthorInput: CreateAuthorInput) {
  //   return 'This action adds a new author';
  // }

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    return this.authors.find((author) => id === author.id);
  }

  // update(id: number, updateAuthorInput: UpdateAuthorInput) {
  //   return `This action updates a #${id} author`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} author`;
  // }
}
