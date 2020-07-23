import { Discord, On, Client, Command, CommandMessage, CommandNotFound } from '@typeit/discord';

// Specify your prefix
@Discord('!')
abstract class AnnouncementPlugin {
    // Reachable with the command: !hello
    @Command('hello')
    private hello(message: CommandMessage) {
        console.log(message);
    }

    // !bye
    // !yo
    @CommandNotFound()
    private notFound(message: CommandMessage) {
        console.log('command not found');
    }
}
