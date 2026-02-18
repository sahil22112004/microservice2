import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserOutboxMigration1771398055402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
                name: "usersOutbox",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "payload",
                        type: "jsonb",
                        isNullable: false,

                    },
                    {
                        name:'status',
                        type:'enum',
                        enum:['pending','published'],
                        default:"'pending'",
                    },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usersOutbox");
    }

}