package us.cryptomaven.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import us.cryptomaven.services.PostService;
import us.cryptomaven.domain.Post;
import us.cryptomaven.repositories.PostRepository;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	PostRepository pr;
	
	@Override
	public Post createPost(Post post) {
		return pr.save(post);
	}

	@Override
	public Post getPostByDid(String did) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Post getPostById(Long id) {
//		return pr.findById(id).get();
	return pr.findOne(id);
		}


	@Override
	public List<Post> findByCat3(String category) {
		try {
			return pr.findByCat3(category);
		} catch (Exception e) {
			return null;
		}
	}
	
	@Override
	public List<Post> findByUsernames(String username) {
	try {
		return pr.findByUsername(username);
	} catch (Exception e) {
	return null;
	}
	}

//	@Override
//	public Object getPostByUsernameAndPassword(String email, String password) {
//		return er.findByUsernameAndPassword(email).get(); 
//	}
	
	@Override
	public List<Post> getAllPosts() {
		return (List<Post>) pr.findAll();
	}
	
	@Override
	public List<Post> findAll() {
		// TODO Auto-generated method stub
		return (List<Post>) pr.findAll();
	}
	
	@Override
	public Post updatesPost(Post change) {
		return pr.save(change);
	}

	@Override
	public boolean deletePost(Post post) {
		return false;
	}

	@Override
	public boolean deleteById(Long id) {
		try {
			pr.deleteById(id);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return false;
		}
		return true; 
	}

	@Override
	public Post updatePostById(Post post) {
		try {
			pr.save(post);
		} catch (IllegalArgumentException e) {
			return null;
		}
		return post;
	}

}
