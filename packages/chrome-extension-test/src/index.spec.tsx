import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Button } from './index';

describe('testing', () => {
    it('module loaded', () => {
        render(<Button label="top_shelf" />);
        expect(screen.getByRole('button')).toHaveTextContent('top_shelf');
    });
});
