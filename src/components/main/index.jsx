import React from 'react';
import { Hero } from './hero';
import { SignUpForm } from './signUpForm';
import { Users } from './users';

export const Main = () => {
  return (
    <main className="main">
      <Hero />
      <Users />
      <SignUpForm />
    </main>
  );
};
