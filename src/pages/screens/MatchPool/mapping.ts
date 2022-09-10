export type ChatColor = 'bot' | 'referee' | 'red' | 'blue' | 'unknown';

export function resolveSharkTeamChatCringe(team: string): ChatColor {
	switch (team) {
		case 'left':
			return 'red';
		case 'right':
			return 'blue';
		case 'unknown':
			return 'referee';
		case 'bot':
			return 'bot';
		default:
			return 'unknown';
	}
}
