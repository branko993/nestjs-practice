import { classToPlain, Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as Crypto from 'bcryptjs';
import { CommentEntity } from 'src/comments/comments.entity';

@Entity({
    name: 'Users',
})
export class UserEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 255, unique: true })
    Email: string;

    @Column({ length: 255, unique: true })
    Username: string;

    @Column({ length: 255 })
    @Exclude()
    Password: string;

    @Column({ length: 255, nullable: true, default: null })
    Bio: string;

    @Column({ length: 255, nullable: true, default: null })
    Image: string;

    @OneToMany(type => CommentEntity, comment => comment.user)
    Comments: CommentEntity[];

    toJSON() {
        return classToPlain(this);
    }

    async comparePassword(password: string) {
        return await Crypto.compare(password, this.Password)
    }
}
