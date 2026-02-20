import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class NotificationMigration1771487463607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
                name: "notificationInbox",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "message",
                        type: "jsonb",
                        isNullable: false,
                    },
                    {
                        name:'status',
                        type:'enum',
                        enum:['pending','consumed'],
                        default:"'pending'",
                    },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notificationInbox");
    }

}