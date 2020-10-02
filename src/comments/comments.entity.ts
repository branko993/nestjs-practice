import { classToPlain } from 'class-transformer';
import { UserEntity } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'Comments',
})
export class CommentEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ length: 255 })
    Details: string;

    @ManyToOne(type => UserEntity, user => user.Id)
    user: UserEntity;

    toJSON() {
        return classToPlain(this);
    }
}
