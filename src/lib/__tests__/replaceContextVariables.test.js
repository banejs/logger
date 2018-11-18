import replaceContextVariables from '../replaceContextVariables';

describe('replaceContextVariables', () => {
    it('should return message without replaced variables for undefined context', () => {
        expect(replaceContextVariables('{{variable}} in message')).toBe('{{variable}} in message');
    });
    
    it('should return message without replaced variables for empty context', () => {
        expect(replaceContextVariables('{{variable}} in message', {})).toBe('{{variable}} in message');
    });
    
    it('should return message with replaced variables', () => {
        expect(replaceContextVariables('{{variable}} in message', { variable: 'food' })).toBe('food in message');
    });
    
    it('should return message with one replaced variables', () => {
        expect(replaceContextVariables('{{variable}} in {{message}}', { variable: 'food' })).toBe('food in {{message}}');
    });
    
    it('should return message with two replaced variables', () => {
        expect(replaceContextVariables('{{variable}} in {{message}}', { variable: 'food', message: 'message' })).toBe('food in message');
    });
    
    it('should return message with replaced "0" value', () => {
        expect(replaceContextVariables('0 === {{variable}}', { variable: 0 })).toBe('0 === 0');
    });

    it('should return message with replaced "null" value', () => {
        expect(replaceContextVariables('null === {{variable}}', { variable: null })).toBe('null === null');
    });
});
