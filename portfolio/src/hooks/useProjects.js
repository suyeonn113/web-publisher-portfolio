import { useEffect, useState } from 'react';
import { fetchProject, fetchProjectIndex } from '../services/projects';

export function useProjectIndex() {
  const [state, setState] = useState({
    projects: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isAlive = true;

    fetchProjectIndex()
      .then((projects) => {
        if (!isAlive) return;
        setState({ projects, isLoading: false, error: null });
      })
      .catch((error) => {
        if (!isAlive) return;
        setState({ projects: [], isLoading: false, error });
      });

    return () => {
      isAlive = false;
    };
  }, []);

  return state;
}

export function useProject(slug) {
  const [state, setState] = useState({
    project: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!slug) return;

    let isAlive = true;

    fetchProject(slug)
      .then((project) => {
        if (!isAlive) return;
        setState({ project, isLoading: false, error: null });
      })
      .catch((error) => {
        if (!isAlive) return;
        setState({ project: null, isLoading: false, error });
      });

    return () => {
      isAlive = false;
    };
  }, [slug]);

  return state;
}
